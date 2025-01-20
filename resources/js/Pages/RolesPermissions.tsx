import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { Button, Checkbox, Label, Modal, Table } from "flowbite-react";
import { useState } from "react";
import axios from "axios";

export default function RolesPermissions({ roles, permissions, auth }: PageProps) {

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        permissions: [] as string[],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;

        if (name === "permissions[]") {
            setData("permissions", checked
                ? [...data.permissions, value]
                : data.permissions.filter((perm) => perm !== value)
            );
        } else {
            setData(name, value);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('storeRole'), {
            onSuccess: () => {
                setSuccessMessage("Role added successfully!");
                setIsCreateModalOpen(false);
                reset();
                setTimeout(() => setSuccessMessage(null), 3000);
            },
            onError: () => {
                console.error("Failed to add role.");
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Roles</h2>}
        >
            <Head title="File Manager" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            Manage Roles
                        </h2>
                        <div className="flex space-x-4"> {/* Botões alinhados horizontalmente */}
                            <Button className="bg-blue-950" onClick={() => setIsCreateModalOpen(true)}>Add a new Role</Button>
                            {/* <Button className="bg-blue-950" onClick={() => setIsModalOpen(true)}>Add a new Permission</Button> */}
                        </div>
                    </div>

                    <div className="flex">
                        {successMessage && (
                            <div className="z-50">
                                <div
                                    className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                                    role="alert"
                                >
                                    <span className="font-medium">Sucesso!</span> {successMessage}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Containers para as tabelas lado a lado */}
                    <div className="flex space-x-8">
                        <div className="w-full"> {/* Tabela 1 com largura de 50% */}
                            <Table hoverable>
                                <Table.Head>
                                    <Table.HeadCell>Role Name</Table.HeadCell>
                                    <Table.HeadCell>Display Name</Table.HeadCell>
                                    <Table.HeadCell>Description</Table.HeadCell>
                                    <Table.HeadCell>
                                        <span className="sr-only">Edit</span>
                                    </Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
                                    {roles.map((role, index) => (
                                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {role.name}
                                            </Table.Cell>
                                            <Table.Cell>{role.display_name}</Table.Cell>
                                            <Table.Cell>{role.description}</Table.Cell>
                                            <Table.Cell>
                                                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                    View
                                                </a>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </div>
                    </div>

                    {/*Start with modal page*/}
                    <Modal show={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                        <Modal.Header>Add a New Role</Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Role Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    {permissions.map((permission, index) => (
                                        <div key={index}>
                                            <label className="block text-sm font-medium text-gray-700">
                                                {permission.display_name}
                                            </label>
                                            <input
                                                type="checkbox"
                                                name="permissions[]"
                                                value={permission.name}
                                                checked={data.permissions.includes(permission.name)}
                                                onChange={handleChange}
                                                className="mt-1"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {processing ? "Saving..." : "Create"}
                                </button>
                            </form>

                        </Modal.Body>
                    </Modal>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
