import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { Card } from "flowbite-react";

export default function Folder({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Folders</h2>}
        >

            {/*Main content*/}
            <Head title="File Manager" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex space-x-8"> {/* Flex container para colocar os elementos lado a lado */}

                        {/* Card */}
                        <Card className="max-w-sm flex-1 relative">
                            {/* Ícone de Folder no centro superior */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center justify-center bg-gray-100 rounded-full p-2 shadow-md">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 text-blue-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75v10.5a2.25 2.25 0 002.25 2.25h12a2.25 2.25 0 002.25-2.25V8.25a2.25 2.25 0 00-2.25-2.25h-7.28a.75.75 0 01-.53-.22L6.97 3.53a.75.75 0 00-.53-.22H6a2.25 2.25 0 00-2.25 2.25z"
                                    />
                                </svg>
                            </div>

                            <div className="flex flex-col items-center pb-10">
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{auth.user.name}</h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">2 GB</span>
                            </div>
                        </Card>

                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}