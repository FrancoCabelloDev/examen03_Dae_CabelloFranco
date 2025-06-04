import { toast } from 'react-toastify'

export const notifyCharacterAdded = (name) => {
  toast.success(`${name} se unió al equipo!`)
}

export const notifyCharacterRemoved = (name) => {
  toast.info(`${name} dejó el equipo`)
}

export const notifyError = (message) => {
  toast.error(message)
}

export const notifySuccess = (message) => {
  toast.success(message)
}

export const notifyRandomGeneration = () => {
  toast.success('Nuevos guerreros generados!')
}