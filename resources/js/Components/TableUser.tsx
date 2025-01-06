import { Table } from "flowbite-react";

export default function TableUser() {
    return (
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
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {'Apple MacBook Pro 17"'}
                    </Table.Cell>
                    <Table.Cell>Sliver</Table.Cell>
                    <Table.Cell>Laptop</Table.Cell>
                    <Table.Cell>$2999</Table.Cell>
                    <Table.Cell>
                        <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                            View
                        </a>
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
}