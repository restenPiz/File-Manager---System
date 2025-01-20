import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { Button, Checkbox, Label, Modal, Table } from "flowbite-react";
import { useState } from "react";

export default function RolesPermissions({ permissions, auth }: PageProps) {

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { post, data, reset, setData } = useForm({
        Folder_name: "",
        id_user: auth.user.id,
        Parent_id: 1,
    });

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

                    {/* Containers para as tabelas lado a lado */}
                    <div className="flex space-x-8">
                        <div className="w-1/2"> {/* Tabela 1 com largura de 50% */}
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
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {'Apple MacBook Pro 17"'}
                                        </Table.Cell>
                                        <Table.Cell>Sliver</Table.Cell>
                                        <Table.Cell>Laptop</Table.Cell>
                                        <Table.Cell>
                                            <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                View
                                            </a>
                                        </Table.Cell>

                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </div>
                        {/* <div className="w-1/2">
                            <Table hoverable>
                                <Table.Head>
                                    <Table.HeadCell>Role Name</Table.HeadCell>
                                    <Table.HeadCell>Display Name</Table.HeadCell>
                                    <Table.HeadCell>
                                        <span className="sr-only">Edit</span>
                                    </Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {'Apple MacBook Pro 17"'}
                                        </Table.Cell>
                                        <Table.Cell>Sliver</Table.Cell>
                                        <Table.Cell>
                                            <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                View
                                            </a>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </div> */}
                    </div>

                    {/*Start with modal page*/}
                    <Modal show={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                        <Modal.Header>Add a New Role</Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Role Name
                                    </label>
                                    <input
                                        name="name"
                                        value={data.Folder_name}
                                        onChange={(e) => setData('Folder_name', e.target.value)}
                                        type="text"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Enter Role Name"
                                    />
                                    <input
                                        type="hidden"
                                        name="display_name"
                                    />
                                    <input
                                        type="hidden"
                                        name="description"
                                    />
                                </div>
                                {permissions.map((permission) => (
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="accept" />
                                        <Label htmlFor="accept" className="flex">
                                            {permission.display_name}
                                        </Label>
                                    </div>
                                ))}
                                <div className="flex justify-end">
                                    <Button type="submit" className="bg-blue-950">
                                        Create
                                    </Button>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>

                    <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <Modal.Header>Add a New Permission</Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Permission Name
                                    </label>
                                    <input
                                        name="name"
                                        value={data.Folder_name}
                                        onChange={(e) => setData('Folder_name', e.target.value)}
                                        type="text"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Enter Role Name"
                                    />
                                    <input
                                        type="hidden"
                                        name="display_name"
                                    />
                                    <input
                                        type="hidden"
                                        name="description"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <Button type="submit" className="bg-blue-950">
                                        Create
                                    </Button>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
