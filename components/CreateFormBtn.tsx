"use client";

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';

const formSchema = z.object({
    name: z.string().min(4),
    description: z.string().optional()
});

type formSchemaType = z.infer<typeof formSchema>

const CreateFormBtn = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    function onSubmit(values: formSchemaType) {
        console.log(values)
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

                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateFormBtn;