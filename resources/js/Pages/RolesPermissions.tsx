import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import TableUser from "@/Components/TableUser";
import { Button } from "flowbite-react";

export default function RolesPermissions({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Roles and Permissions</h2>}
        >
            <Head title="File Manager" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            Manage Roles and Permissions
                        </h2>
                        <div className="flex space-x-4"> {/* Botões alinhados horizontalmente */}
                            <Button className="bg-blue-950">Add a new Role</Button>
                            <Button className="bg-blue-950">Add a new Permission</Button>
                        </div>
                    </div>

                    {/* Containers para as tabelas lado a lado */}
                    <div className="flex space-x-8">
                        <div className="w-1/2"> {/* Tabela 1 com largura de 50% */}
                            <TableUser />
                        </div>
                        <div className="w-1/2"> {/* Tabela 2 com largura de 50% */}
                            <TableUser />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
