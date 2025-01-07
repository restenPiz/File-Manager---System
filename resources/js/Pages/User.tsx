import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import TableUser from "@/Components/TableUser";
import { Button, Modal, Select } from "flowbite-react";
import { useState } from "react";

export default function User({ auth }: PageProps) {

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

                    <TableUser></TableUser>

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
                                        <option>Super admin</option>
                                        <option>Adminstrator</option>
                                        <option>Finance</option>
                                        <option>Accountant</option>
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