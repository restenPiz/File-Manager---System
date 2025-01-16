import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { Checkbox, Table, Dropdown, Button } from "flowbite-react";

export default function File({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Files</h2>}
        >

            <Head title="File Manager" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            File Manager
                        </h2>
                        <Button className="bg-blue-950">
                            Upload File
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell className="p-4">

                            </Table.HeadCell>
                            <Table.HeadCell>File Name</Table.HeadCell>
                            <Table.HeadCell>Size</Table.HeadCell>
                            <Table.HeadCell>Last Modified</Table.HeadCell>
                            <Table.HeadCell></Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="p-4">
                                    <Checkbox />
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {'api-keys.html"'}
                                </Table.Cell>
                                <Table.Cell>2gb</Table.Cell>
                                <Table.Cell>
                                    11-09-2024
                                </Table.Cell>
                                <Table.Cell>
                                    {/* Ícone de três pontos (Menu de opções) */}
                                    <Dropdown inline>

                                        {/* Itens do dropdown */}
                                        <Dropdown.Item>
                                            <a
                                                href="#"
                                                onClick={() => { /* Função para editar */ }}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Edit
                                            </a>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <a
                                                href="#"
                                                onClick={() => { /* Função para excluir */ }}
                                                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Delete
                                            </a>
                                        </Dropdown.Item>
                                    </Dropdown>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}