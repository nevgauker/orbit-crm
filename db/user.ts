import { UserResult } from "@/types/userWithRoles";
import db from "./db";

export const createUser = async (data: { name: string; email: string; password: string }) => {
    const user = db.user.create({
        data, include: {
            roles: {
                include: {
                    team: true,
                }
            }
        }
    })

    return user
}

export const getUserByEmail = async (email: string) => {
    return db.user.findUnique({
        where: { email }, include: {
            roles: {
                include: {
                    team: true,
                }
            }
        }
    })
}


export const getUserById = async (id: string) => {
    return db.user.findUnique({
        where: { id }, include: {
            roles: {
                include: {
                    team: true,
                }
            }
        }
    })
}

export const updateUser = async (id: string, data: Partial<{ name: string; email: string; password: string }>) => {
    return db.user.update({
        where: { id },
        data, include: {
            roles: {
                include: {
                    team: true,
                }
            }
        }
    })
}

export const deleteUser = async (id: string) => {
    return db.user.delete({
        where: { id },
    });
}
