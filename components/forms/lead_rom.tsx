'use client'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const leadSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    status: z.enum(['New', 'Contacted', 'Qualified', 'Converted']),
});

type LeadFormValues = z.infer<typeof leadSchema>;

interface LeadFormProps {
    onSubmit: (data: LeadFormValues) => void;
}

export const LeadForm = ({ onSubmit }: LeadFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LeadFormValues>({
        resolver: zodResolver(leadSchema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="firstName" className="block text-sm font-medium">First Name</label>
                <input id="firstName" {...register('firstName')} className="w-full border px-3 py-2" />
                {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName.message}</p>}
            </div>

            <div>
                <label htmlFor="lastName" className="block text-sm font-medium">Last Name</label>
                <input id="lastName" {...register('lastName')} className="w-full border px-3 py-2" />
                {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName.message}</p>}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input id="email" {...register('email')} className="w-full border px-3 py-2" />
                {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
                <input id="phone" {...register('phone')} className="w-full border px-3 py-2" />
            </div>

            <div>
                <label htmlFor="status" className="block text-sm font-medium">Status</label>
                <select id="status" {...register('status')} className="w-full border px-3 py-2">
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Converted">Converted</option>
                </select>
                {errors.status && <p className="text-red-600 text-sm">{errors.status.message}</p>}
            </div>

            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save Lead</button>
        </form>
    );
};


