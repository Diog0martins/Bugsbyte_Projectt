"use client"

import { useState, useEffect } from "react"
import type React from "react"
import type { User } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getUserByRoutename, getUserAccNo } from '../lib/api';

export default function AccountDetails() {
  const [user, setUser] = useState<any>(null) // Estado para armazenar o usuário
  const [isLoading, setIsLoading] = useState(true) // Estado de loading
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<any>(null)
  
  
  const fetchUserData = async () => {
    setIsLoading(true)
    try {
      const res = await getUserByRoutename({ routeName: "JoaoFernandes" }) // Aguarda resposta da API
      console.log(res) // Debugging
      setUser(res)
      setFormData(res) // Inicializa o formulário com os dados do usuário
    } catch (error) {
      console.error("Erro ao buscar usuário:", error)
    } finally {
      setIsLoading(false) // Para o loading, independentemente do sucesso ou erro
    }
  }

  // useEffect para carregar os dados ao montar o componente
  useEffect(() => {
    fetchUserData()
  }, [])

  // Atualiza os dados conforme o usuário digita no formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev: User) => ({ ...prev, [name]: value }))
  }

  // Salva as mudanças
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUser(formData)
    setIsEditing(false)
  }

  if (isLoading) {
    return <p>Loading...</p> // Mostra "Loading" enquanto os dados estão sendo buscados
  }

  if (!user) {
    return <p>User not found</p> // Caso o usuário não seja encontrado
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Details</CardTitle>
        <CardDescription>View and update your personal information</CardDescription>
      </CardHeader>

      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
              <p>{user.routename}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
              <p>{user.email}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
              <p>{user.phone}</p>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        {isEditing ? (
          <div className="flex space-x-2">
            <Button type="submit" onClick={handleSubmit}>
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false)
                setFormData(user)
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit Details</Button>
        )}
      </CardFooter>
    </Card>
  )
}

