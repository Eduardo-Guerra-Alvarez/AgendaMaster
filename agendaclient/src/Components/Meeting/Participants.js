import { useQuery } from '@tanstack/react-query'
import { getParticipants } from '../../Api/userApi'

function Participants () {


    const { data: participants, isLoadingParticipants, isErrorParticipants
        , errorParticipants } = useQuery({ 
        queryKey: ['participants'],
        queryFn: getParticipants,
    })

    if (isLoadingParticipants) return <div>Loading...</div>
    else if (isErrorParticipants) return <div>Error: {errorParticipants.message}</div>

    return(
        <>
            { participants.map(participant => (
               tr 
            )) }
        </>
    )
}

export default Participants
