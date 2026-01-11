import AccessCodeService from "@/api/services/AccessCodeService";
import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useState, type PropsWithChildren } from "react";

interface Props {
  children: React.ReactNode
}

export default function AccessCodeModal(props: PropsWithChildren<Props>){

  const [open, setOpen] = useState(false);
  const [memberFirstName, setMemberFirstName] = useState("");
  const [memberLastName, setMemberLastName] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  const onOpen = () => {
    setOpen(!open);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    AccessCodeService.add(memberFirstName, memberLastName).then(code => {
      setGeneratedCode(code?.code || "");
      setMemberFirstName("");
      setMemberLastName("");
    });
  }
  
  return (
    <Dialog modal open={open} onOpenChange={onOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="bg-surface max-h-full xs:overflow-scroll">
        {generatedCode && (
          <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
            Code généré avec succès : <strong className="font-bold">{generatedCode}</strong>
          </div>
        )}
        <form className="grid gap-4" onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Code d'accès inscription</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid gap-3">
              <Label htmlFor="memberFirstName">Prénom</Label>
              <Input id="memberFirstName" type="text" 
                onChange={(e) => setMemberFirstName(e.target.value)} 
                value={memberFirstName} />
          </div>
          <div className="grid gap-3">
              <Label htmlFor="memberLastName">Nom de famille</Label>
              <Input id="memberLastName" type="text" 
                onChange={(e) => setMemberLastName(e.target.value)} 
                value={memberLastName} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="hover:bg-accent bg-text text-surface hover:rotate-2">Générer un code</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}