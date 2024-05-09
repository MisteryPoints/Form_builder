"use client";

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod'; 
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from './ui/use-toast';
import { formSchemaType, formSchema } from '@/schemas/form';
import { CreateForm } from '@/actions/form';



const CreateFormBtn = () => {
    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(values: formSchemaType) {
        try {
            const formId = await CreateForm(values);
            toast({
                title: "Exitoso",
                description: "Formulario creado de forma Satisfactoria."
            });
            console.log("FORM ID", formId)
        } catch (error) {
            toast({
                title: "Error",
                description: "Ocurrió un error inesperado, favor de intentarlo más tarde.",
                variant: "destructive"
            });
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Crear nuevo Formulario</Button>
            </DialogTrigger>
            <DialogContent> 
                <DialogHeader>
                    <DialogTitle>
                        Crear formulario
                    </DialogTitle>
                    <DialogDescription>
                        Crear un nuevo formulario para empezar a recibir respuestas.    
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
                        <FormField control={form.control} name='name' render={({field}) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name='description' render={({field}) => (
                            <FormItem>
                                <FormLabel>Descripción</FormLabel>
                                <FormControl>
                                    <Textarea rows={5} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                    </form>
                </Form>
                <DialogFooter>
                    <Button disabled={form.formState.isSubmitting} className='w-full mt-4' onClick={form.handleSubmit(onSubmit)}>
                        {!form.formState.isSubmitting ? <span>Guardar</span> : <ImSpinner2 className='animate-spin' />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateFormBtn;