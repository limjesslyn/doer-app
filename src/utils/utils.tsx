// account
/**
 * email    : jdoe@mail.com
 * name     : John Doe  
 * username : jondoer
 * password : johndoer
 */

export const API_BASE_URL = 'https://task.amidin.site';

export interface ProfileProps {
    email: string,
    name: string
}

export const showFormattedDate = (date: any) => {
    return new Date(date).toLocaleDateString('en-EN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const onDelete = async (taskID: any) => {
    const token = localStorage.getItem('token');

    try {
        const res = await fetch(`${API_BASE_URL}/task/${taskID}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        return res;
    } catch (error) {
        console.log('Error', error);
    }
}