import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { Button, Dropdown, Modal, Select, Table } from "flowbite-react";
import { useState } from "react";

export default function User({ users, roles, auth }: PageProps) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Users</h2>}

        >

            <Head title="File Manager" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            All Users
                        </h2>
                        <Button className="bg-blue-950" onClick={toggleModal}>
                            Add a new user
                        </Button>
                    </div>

                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Username</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Role User</Table.HeadCell>
                            <Table.HeadCell>Number Bi</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {
                                users.length === 0 ? (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell colSpan={5} className="text-center text-gray-500">
                                            No users available
                                        </Table.Cell>
                                    </Table.Row>
                                ) : (
                                    users.map((user, index) => (
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {user.name}
                                            </Table.Cell>
                                            <Table.Cell>{user.email}</Table.Cell>
                                            <Table.Cell></Table.Cell>
                                            <Table.Cell>{user.Number_bi}</Table.Cell>
                                            <Table.Cell>
                                                <Dropdown inline>
                                                    <Dropdown.Item>
                                                        <a
                                                            href="#"
                                                            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                                        >
                                                            Delete
                                                        </a>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <a
                                                            href="#"
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                                        >
                                                            Share
                                                        </a>
                                                    </Dropdown.Item>
                                                </Dropdown>
                                            </Table.Cell>
                                        </Table.Row>
                                    )))}
                        </Table.Body>
                    </Table>

                    {/* Modal */}
                    <Modal show={isModalOpen} onClose={toggleModal}>
                        <Modal.Header>Add a New User</Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        User Name
                                    </label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Enter user name"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Enter email"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Number bi
                                    </label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Enter with number bi"
                                    />
                                </div>
                                <div className="mb-4">
                                    <div className="mb-2 ">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Roles
                                        </label>
                                    </div>
                                    <Select id="countries" required>
                                        <option>==Choose one option==</option>
                                        {roles.map((role, index) => (
                                            <option>{role.name}</option>
                                        ))}
                                    </Select>
                                </div>

                                <div className="flex justify-end">
                                    <Button onClick={toggleModal} className="bg-blue-950">
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