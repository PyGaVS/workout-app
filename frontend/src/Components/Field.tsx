import type { PropsWithChildren } from "react"

interface Props {
  id?: string
  label: string
  inputType: string
}


export default function Field(props: PropsWithChildren<Props>){}