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

//for some reason lead to a typescript error 
//  export type ContactFormValues = z.infer<typeof contactSchema>;

export type ContactFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
};

interface ContactFormProps {
    onSubmit: (data: ContactFormValues) => void;
    initialValues?: ContactFormValues;
    submitLabel?: string;
}

export const ContactForm = ({ onSubmit, initialValues, submitLabel = 'Save Contact' }: ContactFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: initialValues,
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-lg border bg-card p-6">
            <div>
                <label htmlFor="firstName" className="block text-sm text-muted-foreground">First Name</label>
                <input id="firstName" {...register('firstName')} className="w-full border rounded-md px-3 py-2 bg-background" />
                {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName.message}</p>}
            </div>

            <div>
                <label htmlFor="lastName" className="block text-sm text-muted-foreground">Last Name</label>
                <input id="lastName" {...register('lastName')} className="w-full border rounded-md px-3 py-2 bg-background" />
                {errors.lastName && <p className="text-red-600 text-xs mt-1">{errors.lastName.message}</p>}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm text-muted-foreground">Email</label>
                <input id="email" {...register('email')} className="w-full border rounded-md px-3 py-2 bg-background" />
                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm text-muted-foreground">Phone</label>
                <input id="phone" {...register('phone')} className="w-full border rounded-md px-3 py-2 bg-background" />
            </div>

            <div>
                <label htmlFor="company" className="block text-sm text-muted-foreground">Company</label>
                <input id="company" {...register('company')} className="w-full border rounded-md px-3 py-2 bg-background" />
            </div>

            <button type="submit" className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90">{submitLabel}</button>
        </form>
    )
}


