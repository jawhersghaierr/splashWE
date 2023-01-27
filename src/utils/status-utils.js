import { useEffect, useRef } from "react";

/**
 * Labels and Colors for Statuses
 * *******************************************************************************************************************
 */

export const paiementsVirementStatus = {
  DOUBLON: { label: "Doublon", color: "#FFA3A3" },
  VALIDE: { label: "Valide", color: "#C7F99F" },
};

export const rocStatus = {
  VALIDE: { label: "Valide", color: "#C7F99F" },
  INVALIDE: { label: "Invalide", color: "#FFA3A3" },
  CALCULEE: { label: "Calculée", color: "#C7F99F" },
  ACCORDEE: { label: "Accordée", color: "#C7F99F" },
  REJETEE: { label: "Rejetée", color: "#FFA3A3" },
  ANNULEE: { label: "Annulée", color: "#FFD4AD" },
  FACTUREE: { label: "Facturée", color: "#B3EFF8" },
};

export const paiementsStatus = {
  VALIDE: { label: "Valide", color: "#C7F99F" },
  VALIDE_HCP: { label: "Valide HCP", color: "#C7F99F" },
  SUSPENDU: { label: "Suspendu", color: "#FFD4AD" },
  ERREUR_EXTRACTION: { label: "Erreur d'extraction", color: "#FFA3A3" },
  EN_ATTENTE: { label: "En attente", color: "#FFD4AD" },
  EXTRAIT: { label: "Extrait", color: "#C7F99F" },
  ERREUR: { label: "Erreur", color: "#FFA3A3" },
  ANNULE: { label: "Annulé", color: "#FFA3A3" },
  PAYE: { label: "Payé", color: "#C7F99F" },
  REMBOURSE: { label: "Remboursé", color: "#B3EFF8" },
  EN_COURS: { label: "En cours", color: "#FFD4AD" },
  A_RECYCLER: { label: "A recycler", color: "#FFD4AD" },
};

export const factureConfigurationStatus = {
  A: { label: "Active", color: "#C7F99F" },
  // Active: { label: "Active", color: "#C7F99F" }, //fixed from BE
  S: { label: "Suspendue", color: "#FFD4AD" },
  I: { label: "Inactive", color: "#FFA3A3" },
};

export const statusesRIB = {
  ATT: { label: "En attente", color: "#FFD4AD" },
  REF: { label: "Refusé", color: "#FFA3A3" },
  MIS: { label: "Manquant", color: "#B3EFF8" },
  NA: { label: "Inactif", color: "#99ACBB" },
  ACT: { label: "Validé", color: "#C7F99F" },
};

export const facturesStatus = {
  Valide: { label: "Valide", color: "#C7F99F" },
  Radié: { label: "Radié", color: "#FFA3A3" },
  Suspendu: { label: "Suspendu", color: "#FFD4AD" },
  ANNULEE: { label: "Annulée", color: "#FFA3A3" },
  A_RECYCLER: { label: "A recycler", color: "#FFD4AD" },
  BAP: { label: "Bon à payer", color: "#C7F99F" },
  EN_ATTENTE: { label: "En attente", color: "#FFD4AD" },
  PAYEE: { label: "Payée", color: "#C7F99F" },
  PENDING: { label: "En cours", color: "#FFD4AD" },
  REJETEE: { label: "Rejetée", color: "#FFA3A3" },
  REMBOURSEE: { label: "Remboursée", color: "#B3EFF8" },
};

export const benefStatuses = {
  Valide: { label: "Valide", color: "#C7F99F" },
  Radié: { label: "Radié", color: "#FFA3A3" },
  Suspendu: { label: "Suspendu", color: "#FFD4AD" },
  Invalide: { label: "Invalide", color: "#EBEBEB" },
};

/**
 *  Hook for Previous State
 * *******************************************************************************************************************
 */
export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
