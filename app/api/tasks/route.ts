import { createTask, getTasksByTeam } from "@/db/task";
import { NextResponse } from "next/server";
import { assertTeamMembership, assertTeamRole, getAuthUserId } from "@/utils/authorization";
import { Role } from "@prisma/client";
import { z } from "zod";
import db from "@/db/db";
import { updateTask, deleteTask } from "@/db/task";

const taskSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    dueDate: z.string().optional(),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'OVERDUE']).default('PENDING'),
    priority: z.enum(['HIGH', 'MEDIUM', 'LOW']).default('MEDIUM'),
    teamId: z.string().min(1),
})

export async function POST(req: Request) {
    try {
        const userId = await getAuthUserId(req)
        const json = await req.json();
        const data = taskSchema.parse(json)
        await assertTeamMembership(userId, data.teamId)
        const newTask = await createTask(data)
        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        if (error instanceof Response) return error
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 })
        }
        console.log(error)
        return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
    }
}

const taskUpdateSchema = z.object({
    id: z.string().min(1),
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    dueDate: z.string().optional(),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'OVERDUE']).optional(),
    priority: z.enum(['HIGH', 'MEDIUM', 'LOW']).optional(),
})

export async function PATCH(req: Request) {
    try {
        const userId = await getAuthUserId(req)
        const json = await req.json()
        const data = taskUpdateSchema.parse(json)
        const existing = await db.task.findUnique({ where: { id: data.id } })
        if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        await assertTeamMembership(userId, existing.teamId)
        const { id, ...fields } = data
        const updated = await updateTask(id, fields)
        return NextResponse.json(updated)
    } catch (error) {
        if (error instanceof Response) return error
        if (error instanceof z.ZodError) return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 })
        console.log(error)
        return NextResponse.json({ error: 'Failed to update task' }, { status: 500 })
    }
}

const taskDeleteSchema = z.object({ id: z.string().min(1) })

export async function DELETE(req: Request) {
    try {
        const userId = await getAuthUserId(req)
        const json = await req.json()
        const { id } = taskDeleteSchema.parse(json)
        const existing = await db.task.findUnique({ where: { id } })
        if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        await assertTeamRole(userId, existing.teamId, [Role.ADMIN, Role.OWNER])
        await deleteTask(id)
        return NextResponse.json({ success: true })
    } catch (error) {
        if (error instanceof Response) return error
        if (error instanceof z.ZodError) return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 })
        console.log(error)
        return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 })
    }
}


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const teamId = searchParams.get("teamId")
    if (!teamId) {
        return new Response(JSON.stringify({ error: "teamId is required" }), { status: 400 });
    }
    try {
        const userId = await getAuthUserId(request)
        await assertTeamMembership(userId, teamId)
        const leads = await getTasksByTeam(teamId)
        return NextResponse.json(leads)
    } catch (error) {
        if (error instanceof Response) return error
        console.log(error)
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }
}
