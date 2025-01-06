import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Card } from "flowbite-react";
import TableUser from '@/Components/TableUser';

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">File Management System - Lorys</h2>}
        >
            <Head title="File Manager" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex space-x-8"> {/* Flex container para colocar os elementos lado a lado */}

                        {/* Card */}
                        <Card className="max-w-sm flex-1"> {/* flex-1 faz o card ocupar uma parte proporcional */}
                            <div className="flex justify-end px-4 pt-4">
                                {/* Coloque aqui os ícones ou outros itens para o card */}
                            </div>
                            <div className="flex flex-col items-center pb-10">
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{auth.user.name}</h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{auth.user.email}</span>
                                <div className="mt-4 flex space-x-3 lg:mt-6">
                                    <a
                                        href="#"
                                        className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                                    >
                                        Update Profile
                                    </a>
                                </div>
                            </div>
                        </Card>

                        {/* DataTable */}
                        <div className="flex-1"> {/* A DataTable ocupa o restante espaço */}
                            <TableUser></TableUser>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
