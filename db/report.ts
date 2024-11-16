import db from './db';

export const createReport = async (data: {
    title: string;
    description?: string;
    data: any;
    ownerId: string;
}) => {
    return db.report.create({
        data,
    })
}

export const getReportsByUser = async (ownerId: string) => {
    return db.report.findMany({
        where: { ownerId },
    });
}

export const updateReport = async (id: string, data: Partial<{
    title: string;
    description?: string;
    data: any;
}>) => {
    return db.report.update({
        where: { id },
        data,
    })
}

export const deleteReport = async (id: string) => {
    return db.report.delete({
        where: { id },
    })
}
