export type UserRole = "Bailleur" | "Courtier" | "Locataire" | "Prestataire" | "bailleur" | "courtier" | "locataire" | "prestataire";
export type Language = "fr" | "ln" | "sw";

export type ProfileCategory = "bailleur_resident" | "diaspora" | "courtier_agence" | "locataire" | "prestataire";

export interface UserProfile {
  id?: string;
  name: string;
  category: ProfileCategory;
  email?: string;
  phone?: string;
  cityCommune?: string;
  countryResidence?: string;
  createdAt?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai" | "system";
  text: string;
  timestamp: string;
}

export type PropertyType = 
  | "Parcelle nu"
  | "Villa" 
  | "Appartement" 
  | "Immeuble Commercial" 
  | "Boutique de marché" 
  | "Studio Meublé";

export type PropertyStatus = "Disponible" | "Loué" | "En maintenance" | "En négociation";

export type EquipmentTag = 
  | "Groupe Électrogène"
  | "Forage d'eau"
  | "Panneaux Solaires"
  | "Climatisation"
  | "Gardiennage"
  | "Cuve REGIDESO & Surpresseur"
  | "Compteur Cash Power SNEL"
  | "Parking intérieur sécurisé"
  | "Fibre Optique / Wifi"
  | "Piscine";

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  commune: string;
  quartier: string;
  adresse: string;
  superficie: number; // m²
  pieces: number;
  chambres: number;
  sallesDeBain: number;
  loyerUsd: number;
  chargesUsd: number;
  cautionMois: number; // max 3 mois légal RDC pour résidentiel, 6 pour commercial
  status: PropertyStatus;
  images: string[];
  titreFoncierRef: string; // ex: Vol. KIN/GOMBE Fol. 142 N° 3892
  equipements: EquipmentTag[];
  proprietaireId: string;
  proprietaireName: string;
  courtierId?: string;
  courtierCommissionUsd?: number;
  rating: number;
  featured?: boolean;
  virtualTour360?: boolean;
  createdAt: string;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  cniPassportNumber: string;
  profession: string;
  professionType: "Expatrié / Diplomate" | "Cadre Entreprise" | "Fonctionnaire" | "Commerçant / Indépendant" | "Étudiant / Autre";
  employer: string;
  monthlyIncomeUsd: number;
  hasGuarantor: boolean;
  guarantorName?: string;
  guarantorPhone?: string;
  guarantorProfession?: string;
  creditScore: number; // 0 - 100
  riskLevel: "FAIBLE" | "MODÉRÉ" | "ÉLEVÉ";
  verifiedDocs: string[];
  activePropertyId?: string;
  totalLeasesCount: number;
  reliabilityBadge: "Or" | "Argent" | "Bronze";
}

export interface Lease {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyCommune?: string;
  tenantId: string;
  tenantName: string;
  landlordId?: string;
  landlordName?: string;
  bailleurName?: string;
  brokerId?: string;
  startDate: string;
  endDate: string;
  loyerMensuelUsd: number;
  chargesMensuellesUsd: number;
  cautionUsd: number;
  cautionMois?: number;
  dureeMois: number;
  statut?: "Actif" | "En attente" | "Terminé" | "Résilié";
  status?: string;
  preavisMois?: number; // 3 mois standard loi RDC 15/025
  clausesSpeciales?: string[];
  signatureBailleurDate?: string;
  signatureLocataireDate?: string;
  termsPdfUrl?: string;
  quittancesCount: number;
  createdAt?: string;
}

export type PaymentMethod = 
  | "M-Pesa (Vodacom)" 
  | "Orange Money" 
  | "Airtel Money" 
  | "Afrimoney" 
  | "Virement Bancaire (Rawbank)" 
  | "Virement Bancaire (Equity BCDC)" 
  | "Virement Bancaire (TMB - Pepele)" 
  | "Virement Bancaire (Sofibanque)" 
  | "Virement Bancaire (Ecobank)" 
  | "Espèces (Reçu)";

export interface PaymentTransaction {
  id: string;
  leaseId: string;
  propertyId: string;
  propertyTitle: string;
  tenantId: string;
  tenantName: string;
  amountUsd: number;
  amountCdf: number;
  exchangeRateUsed: number;
  paymentMethod: PaymentMethod;
  status: "Payé" | "En attente de validation" | "En retard" | "Rejeté";
  dueDate: string;
  paidDate?: string;
  receiptNumber: string;
  monthFor: string;
  txReference: string;
  retenueIrlUsd: number; // 22% IRL RDC
  bankTransferDetails?: {
    bankName: string;
    payerAccountName: string;
    slipNumber: string;
    notes?: string;
  };
}

export interface MaintenanceTicket {
  id: string;
  propertyId: string;
  propertyTitle: string;
  commune: string;
  tenantId: string;
  tenantName: string;
  tenantPhone: string;
  title: string;
  category: "Plomberie / Eau" | "Électricité / Groupe" | "Climatisation" | "Génie Civil / Toiture" | "Serrurerie / Sécurité";
  description: string;
  urgency: "Basse" | "Moyenne" | "Urgente" | "Critique (Panne Groupe)";
  status: "Nouveau" | "Devis reçu" | "Prestataire assigné" | "En réparation" | "Résolu";
  assignedProviderId?: string;
  assignedProviderName?: string;
  costUsd?: number;
  createdAt: string;
  resolvedAt?: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  specialty: string;
  commune: string;
  phone: string;
  avatar: string;
  rating: number;
  completedJobs: number;
  verified: boolean;
  hourlyRateUsd: number;
  emergencyAvailable: boolean;
}

export interface MarketCommuneStat {
  commune: string;
  avgPriceM2Usd: number;
  avgRentUsd: number;
  demandLevel: "Très Forte" | "Forte" | "Moyenne";
  occupancyRate: number; // e.g. 94%
  topAmenities: string[];
  growthYear: string;
}

export interface ExchangeRateData {
  usd_to_cdf: number;
  cdf_to_usd: number;
  source: string;
  updated_at: string;
  historical?: { date: string; rate: number }[];
}
