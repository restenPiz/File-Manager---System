import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { Button, Checkbox, Dropdown, Label, Modal, Table } from "flowbite-react";
import { useState } from "react";
import axios from "axios";

export default function RolesPermissions({ roles, permissions, auth }: PageProps) {

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [deletingRoleId, setDeletingRoleId] = useState<number | null>(null);
    const toggleDeleteModal = () => setIsDeleteModalOpen(!isDeleteModalOpen);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        permissions: [] as string[],
    });

    const [formData, setFormData] = useState({
        name: "",
        display_name: "",
        description: "",
    });

    const openCreateModal = () => {
        setData({
            name: "",
            permissions: [], // Limpa as permissões
        });
        setIsCreateModalOpen(true);
    };

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

    const handleEditClick = async (roleId: number) => {
        try {
            const response = await axios.get(route("editRole", { id: roleId }));
            const role = response.data;

            setSelectedRole(role);

            // Atualiza os dois estados: formData e data
            const updatedFormData = {
                name: role.name || "",
                display_name: role.display_name || "",
                description: role.description || "",
            };

            setFormData(updatedFormData);

            const permissions = role.permissions.map((perm) => perm.name);
            setData({
                ...updatedFormData, // Sincroniza com formData
                permissions,
            });

            setIsEditModalOpen(true);
        } catch (error) {
            console.error("Erro ao carregar os dados da role:", error);
        }
    };

    const handleDelete = () => {
        if (deletingRoleId !== null) {
            post(route('deleteRole', { id: deletingRoleId }), {
                onSuccess: () => {
                    setSuccessMessage('Role deleted successfully!');
                    setIsDeleteModalOpen(false);
                    setDeletingRoleId(null);
                    setTimeout(() => {
                        setSuccessMessage(null);
                    }, 3000);
                },
            });
        }
    };

    const openDeleteModal = (id: number) => {
        setDeletingRoleId(id);
        setIsDeleteModalOpen(true); // Abre o modal de confirmação
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
                            <Button className="bg-blue-950" onClick={openCreateModal}>Add a new Role</Button>
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
                                    <span className="font-medium">Success!</span> {successMessage}
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
                                                <Dropdown inline>
                                                    <Dropdown.Item>
                                                        <a
                                                            onClick={() => handleEditClick(role.id)}
                                                            href="#"
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                                        >
                                                            Edit
                                                        </a>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <a
                                                            onClick={() => openDeleteModal(role.id)}
                                                            href="#"
                                                            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                                        >
                                                            Delete
                                                        </a>
                                                    </Dropdown.Item>
                                                </Dropdown>
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

                    <Modal show={isDeleteModalOpen} onClose={toggleDeleteModal}>
                        <Modal.Header>Confirm Deletion</Modal.Header>
                        <Modal.Body>
                            <p>Are you sure you want to delete this role?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button color="gray" onClick={toggleDeleteModal}>
                                Cancel
                            </Button>
                            <Button className="bg-red-700 text-gray-100" color="failure" onClick={handleDelete}>
                                Confirm
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                        <Modal.Header>
                            <h2 className="text-lg font-semibold">Edit Role</h2>
                        </Modal.Header>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();

                                const payload = {
                                    name: data.name,
                                    display_name: data.display_name,
                                    description: data.description,
                                    permissions: data.permissions,
                                };

                                console.log("Payload enviado:", payload);

                                post(route("updateRole", { id: selectedRole?.id }), {
                                    data: payload,
                                    onSuccess: () => {
                                        setSuccessMessage("Role updated successfully!");
                                        setIsEditModalOpen(false);
                                        reset();
                                        setTimeout(() => {
                                            setSuccessMessage(null);
                                        }, 3000);
                                    },
                                    onError: (err) => {
                                        console.error("Erro ao atualizar role:", err);
                                    },
                                });
                            }}
                        >
                            <Modal.Body>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Role Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        title="Enter the name of the role"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Display Name</label>
                                    <input
                                        type="text"
                                        name="display_name"
                                        value={formData.display_name}
                                        onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                                        placeholder="Enter a display name"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description || ""}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Permissions</label>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {permissions.map((permission) => (
                                            <label key={permission.id} className="inline-flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    name="permissions[]"
                                                    value={permission.name}
                                                    checked={data.permissions.includes(permission.name)}
                                                    onChange={handleChange}
                                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                                />
                                                <span className="text-sm text-gray-700">{permission.display_name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="submit" className="bg-blue-600 text-white">
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </form>
                    </Modal>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
