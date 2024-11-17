'use client'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const contactSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    company: z.string().optional(),
})

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactFormProps {
    onSubmit: (data: ContactFormValues) => void;
}

export const ContactForm = ({ onSubmit }: ContactFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    })

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
                <label htmlFor="company" className="block text-sm font-medium">Company</label>
                <input id="company" {...register('company')} className="w-full border px-3 py-2" />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Contact</button>
        </form>
    )
}


