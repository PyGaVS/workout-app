import type AccessCode from "@/api/models/AccessCode";
import AccessCodeService from "@/api/services/AccessCodeService";
import AdminView from "@/Components/AdminView";
import { Table, TableBody, TableHead, TableRow, TableCell, TableHeader } from "@/Components/ui/table";
import { useEffect, useState } from "react";
import AccessCodeModal from "./AccessCodeModal";

export default function AccessCodes() {
  const  [accessCodes, setAccessCodes] = useState<AccessCode[]>([]);

  useEffect(() => {
    AccessCodeService.browse().then((codes) => setAccessCodes(codes));
  }, []);

  return (
    <AdminView title="Access Codes">
      <AccessCodeModal>
        <button className="bg-text text-surface inline-flex px-2 py-3 rounded-radius my-3 mx-6 border-none
        shadow-md transition-all duration-300 hover:bg-accent hover:shadow-lg hover:scale-105">
          Générer un code d'accès
        </button>
      </AccessCodeModal>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Prénom</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Utilisateur assigné</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accessCodes.map((code, index) => (
            <TableRow key={index}>
              <TableCell>{code.memberFirstName}</TableCell>
              <TableCell>{code.memberLastName}</TableCell>
              <TableCell>{code.code}</TableCell>
              <TableCell>{code.user ? code.user.fullName : <span className="italic">Non utilisé</span>}</TableCell>
            </TableRow>
        ))}
        </TableBody>
      </Table>
    </AdminView>
  )
}