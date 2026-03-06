import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Auth from './components/Auth';
import { supabase } from './lib/supabase';
import { vi } from 'vitest';

// Mockear supabase para evitar peticiones reales a la db con los tests
vi.mock('./lib/supabase', () => ({
    supabase: {
        auth: {
            signInWithPassword: vi.fn(),
            signUp: vi.fn(),
        },
    },
}));

describe('Auth Component Messages', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    const mockOnAuthSuccess = vi.fn();

    it('debe mostrar el mensaje de éxito "¡Autenticación satisfactoria!" al iniciar sesión correctamente', async () => {
        // mockear firma exitosa
        (supabase.auth.signInWithPassword as ReturnType<typeof vi.fn>).mockResolvedValue({
            data: { user: { id: '123' } },
            error: null,
        });

        render(<Auth onAuthSuccess={mockOnAuthSuccess} />);

        // Llenar datos e intentar login
        await userEvent.type(screen.getByPlaceholderText('tu@correo.com'), 'test@example.com');
        await userEvent.type(screen.getByPlaceholderText('••••••••'), 'password123');

        // El botón por defecto es el de iniciar sesión
        await userEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

        // Verificamos que el mensaje de éxito esté en el documento después del submit
        await waitFor(() => {
            expect(screen.getByText('¡Autenticación satisfactoria!')).toBeInTheDocument();
        });

        // Verificamos que también se llame onAuthSuccess
        expect(mockOnAuthSuccess).toHaveBeenCalled();
    });

    it('debe mostrar el mensaje "Error en la autenticación." al fallar credenciales inválidas', async () => {
        // mockear error de credenciales invalidas (este es el catch base de supabase login fail code)
        (supabase.auth.signInWithPassword as ReturnType<typeof vi.fn>).mockResolvedValue({
            data: { user: null },
            error: { message: 'Invalid login credentials' },
        });

        render(<Auth onAuthSuccess={mockOnAuthSuccess} />);

        // Llenar datos e intentar login
        await userEvent.type(screen.getByPlaceholderText('tu@correo.com'), 'wrong@example.com');
        await userEvent.type(screen.getByPlaceholderText('••••••••'), 'wrongpassword');

        // Click en botón de iniciar sesión
        await userEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

        // Verificamos que el mensaje de error "Error en la autenticación. Verifica tu correo y contraseña." esté en el documento
        await waitFor(() => {
            expect(screen.getByText(/Error en la autenticación/i)).toBeInTheDocument();
        });

        // Verificamos que NO se haya llamado la función de éxito
        expect(mockOnAuthSuccess).not.toHaveBeenCalled();
    });
});
