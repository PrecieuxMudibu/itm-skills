import socketIOClient from 'socket.io-client'
import process from 'process'

export const IO = socketIOClient(process.env.NEXT_PUBLIC_LINK_API)
