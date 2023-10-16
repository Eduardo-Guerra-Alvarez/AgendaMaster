import './Users.css'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getParticipants } from '../../Api/userApi'

function Users () {

    const queryClient = useQueryClient()

    const { data: users, isLoading, isError, error } = useQuery({
        queryKey: ['users'],
        queryFn: getParticipants,
    })

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {error.message}</div>

    const showUsers = () => {
        return users.data.map(({_id, name, phone, email}) => (
            <tr key={_id}>
                <td>{name}</td>
                <td>{phone}</td>
                <td>{email}</td>
            </tr>
        ))
    }

    return(
        <>
            <div className="containerUser">
                <h1>Users</h1>
                <div className="wrap-table">
                    <table className="tableEvents">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Telefono</th>
                                <th>Correo</th>
                            </tr>
                        </thead>
                        <tbody>
                            { showUsers() }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Users
