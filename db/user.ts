import db from "./db";

export const createUser = async (data: { name: string; email: string; password: string }) => {
    const user = db.user.create({
        data,
    })

    return user

}

export const getUserByEmail = async (email: string) => {
    return db.user.findUnique({
        where: { email },
    })
}


export const getUserById = async (id: string) => {
    return db.user.findUnique({
        where: { id },
    })
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
