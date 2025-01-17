import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { Checkbox, Table, Dropdown, Button, Modal } from "flowbite-react";
import { useState } from "react";
import { FaEnvelope } from 'react-icons/fa'; 

export default function File({ auth, folderId, files }: PageProps) {

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const toggleDeleteModal = () => setIsDeleteModalOpen(!isDeleteModalOpen);
    const toggleShareModal = () => setIsShareModalOpen(!isShareModalOpen);
    const [deletingFileId, setDeletingFileId] = useState<number | null>(null);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [shareFileId, setShareFileId] = useState<number | null>(null);

    const { post, data, setData, reset } = useForm({
        Path: '',
        Quantity: '',
        File_name: '',
        id_folder: folderId,
        id_user: auth.user.id, 
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setData('Quantity', (file.size / (1024 * 1024)).toFixed(2)); 
        }
    };

    const openDeleteModal = (id: number) => {
        setDeletingFileId(id);
        setIsDeleteModalOpen(true); 
    };

    const openShareModal = (id: number) => {
        setShareFileId(id);
        setIsShareModalOpen(true); 
    };

    //*Inicio dos metodos de Requisicao
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setData('id_folder', folderId);

        post(route('storefile'), {
            onSuccess: () => {
                setSuccessMessage('File uploaded successfuly!');
                setIsCreateModalOpen(false);
                reset();
                setSelectedFile(null);
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000);
            },
        });
    };

    const handleDelete = () => {
        if (deletingFileId !== null) {
            post(route('deleteFile', { id: deletingFileId }), {
                onSuccess: () => {
                    setSuccessMessage('File deleted successfully!');
                    setIsDeleteModalOpen(false);
                    setDeletingFileId(null);
                    setTimeout(() => {
                        setSuccessMessage(null);
                    }, 3000);
                },
            });
        }
    };

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
                        <div className="flex space-x-4">
                            <Button className="bg-green-800 flex items-center" onClick={() => window.history.back()}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                                Back
                            </Button>
                            <Button className="bg-blue-950 flex items-center" onClick={() => setIsCreateModalOpen(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8l-8 8-8-8" />
                                </svg>
                                Upload File
                            </Button>
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

                    {/*Start with the table*/}
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell className="p-4"></Table.HeadCell>
                            <Table.HeadCell>File Name</Table.HeadCell>
                            <Table.HeadCell>Size</Table.HeadCell>
                            <Table.HeadCell>Last Modified</Table.HeadCell>
                            <Table.HeadCell></Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {files.length === 0 ? (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell colSpan={5} className="text-center text-gray-500">
                                        No files available
                                    </Table.Cell>
                                </Table.Row>
                            ) : (
                                    files.map((file) => (
                                        <Table.Row key={file.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="p-4">
                                                <Checkbox />
                                            </Table.Cell>
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex items-center">
                                                <svg
                                                    className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-6l-2-2h-6a2 2 0 00-2 2v0z"
                                                    />
                                                </svg>
                                                <a
                                                    href={`/storage/${file.Path}`}
                                                    className="text-gray-900 hover:text-blue-500 transition-colors duration-300"
                                                    download={file.File_name}>
                                                    {file.File_name}
                                                </a>
                                            </Table.Cell>
                                            <Table.Cell>
                                                {file.Quantity}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {new Date(file.created_at).toLocaleDateString('pt-br', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Dropdown inline>
                                                    <Dropdown.Item>
                                                        <a
                                                            href="#"
                                                            onClick={() => openDeleteModal(file.id)}
                                                            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                                        >
                                                            Delete
                                                        </a>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <a
                                                            href="#"
                                                            onClick={() => openShareModal(file.id)}
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                                        >
                                                            Share
                                                        </a>
                                                    </Dropdown.Item>
                                                </Dropdown>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                            )}
                        </Table.Body>
                    </Table>

                    <Modal show={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                        <Modal.Header>File Upload</Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleSubmit}>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 16"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input
                                            name="Path"
                                            id="dropzone-file"
                                            type="file"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const fileSizeMB = file.size / (1024 * 1024);
                                                    const maxSizeMB = 10;

                                                    if (fileSizeMB > maxSizeMB) {
                                                        alert(`O arquivo é muito grande! O tamanho máximo permitido é ${maxSizeMB}MB.`);
                                                        return;
                                                    }

                                                    setData("Path", file);
                                                    setData("Quantity", `${fileSizeMB.toFixed(2)} MB`);
                                                }
                                            }}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <br />

                                <div className="mb-4">
                                    <input
                                        type="hidden"
                                        name="File_name"
                                        onChange={(e) => setData("File_name", e.target.value)}
                                        placeholder="Nome do Arquivo"
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
                                    />
                                </div>

                                <input
                                    name="id_user"
                                    value={auth.user.id}
                                    readOnly
                                    className="hidden"
                                />
                                <input name="id_folder" value={folderId} readOnly hidden />

                                <div className="flex justify-end">
                                    <Button type="submit" className="bg-blue-950">
                                        Upload
                                    </Button>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>

                    {/*Delete Modal*/}
                    <Modal show={isDeleteModalOpen} onClose={toggleDeleteModal}>
                        <Modal.Header>Confirm Deletion</Modal.Header>
                        <Modal.Body>
                            <p>Are you sure you want to delete this file?</p>
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

                    {/*Share Modal*/}
                    <Modal show={isShareModalOpen} onClose={toggleShareModal}>
                        <Modal.Header>Compartilhar Ficheiro</Modal.Header>

                        <Modal.Footer>
                            <Button
                                as="a"
                                href={files && files.File_name ? `mailto:?subject=Compartilhar Arquivo&body=Eu gostaria de compartilhar este arquivo com você: ${files.File_name}` : "#"}
                                className="bg-red-600 text-white flex items-center"
                                disabled={!files || !files.File_name} // Desabilita o botão se não houver arquivo ou nome de arquivo
                            >
                                <FaEnvelope className="mr-2" />
                                Enviar por Gmail
                            </Button>

                            {/* Botão para abrir o Gmail */}

                        </Modal.Footer>
                    </Modal>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}