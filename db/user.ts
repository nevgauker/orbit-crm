import db from "./db";

export const createUser = async (data: { name: string; email: string; password: string }) => {
    return db.user.create({
        data,
    })
}

export const getUserById = async (id: string) => {
    return db.user.findUnique({
        where: { id },
    })
}

export const getAllUsers = async () => {
    return db.user.findMany();
}

export const updateUser = async (id: string, data: Partial<{ name: string; email: string; password: string }>) => {
    return db.user.update({
        where: { id },
        data,
    })
}

export const deleteUser = async (id: string) => {
    return db.user.delete({
        where: { id },
    });
}
