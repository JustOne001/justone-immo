/* cspell:ignore Bailleur Loué Août Payé loyer Impôt Revenu Locatif Résolu Urgente Patrimoine Immobilier Sécurisé Banque Centrale Bord Supervisez baux encaissements MobileMoney M-Pesa quittances quittances émises Pesa DGRK Vidange Perkins SDMO équipements autonomie superficie chambres quartier loués Loyers Encaissés Préavis résiliation locataire bailleur garantie plafonnée mois logement Caution CENI RCCM suivez générez légales conformes Rédiger Légal Estimer Fiscale Retenue Pannes Groupes cours État titres fonciers Ajouter bien Foncier Contrats légaux dépôts historique Actif duree Période Contrat Paiements Reçus Légale reversée impôts */
import React from "react";
import { motion } from "motion/react";
import { Property, Tenant, Lease, PaymentTransaction, MaintenanceTicket, Language } from "../types";
import { DICTIONARY } from "../services/i18n";
import { formatDualCurrency, formatUsd, formatCdf } from "../services/currency";
import { 
  Building2, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  DollarSign, 
  Wrench, 
  Plus, 
  Sparkles, 
  FileText, 
  ArrowUpRight, 
  Calendar,
  Smartphone,
  ShieldCheck,
  Download
} from "lucide-react";

interface DashboardBailleurProps {
  properties: Property[];
  tenants: Tenant[];
  leases: Lease[];
  transactions: PaymentTransaction[];
  tickets: MaintenanceTicket[];
  bccRate: number;
  primaryCurrency: "USD" | "CDF";
  currentLanguage: Language;
  onOpenAddProperty: () => void;
  onOpenLeaseGenerator: () => void;
  onOpenMarketEstimator: () => void;
  onSelectProperty: (prop: Property) => void;
  onSelectTransaction: (tx: PaymentTransaction) => void;
}

export const DashboardBailleur: React.FC<DashboardBailleurProps> = ({
  properties,
  tenants,
  leases,
  transactions,
  tickets,
  bccRate,
  primaryCurrency,
  currentLanguage,
  onOpenAddProperty,
  onOpenLeaseGenerator,
  onOpenMarketEstimator,
  onSelectProperty,
  onSelectTransaction,
}) => {
  const t = DICTIONARY[currentLanguage];

  // Financial calculations
  const totalProperties = properties.length;
  const occupiedProperties = properties.filter((p) => p.status === "Loué").length;
  const occupancyRate = totalProperties > 0 ? Math.round((occupiedProperties / totalProperties) * 100) : 0;

  const currentMonthRentUsd = transactions
    .filter((tx) => tx.monthFor.includes("Août") && tx.status === "Payé")
    .reduce((sum, tx) => sum + tx.amountUsd, 0);

  const totalPotentialRentUsd = properties.reduce((sum, p) => sum + p.loyerUsd + p.chargesUsd, 0);
  
  // Tax calculation: IRL (Impôt sur le Revenu Locatif en RDC = 22%)
  const estimatedIrlTaxUsd = Math.round(currentMonthRentUsd * 0.22);

  const activeTickets = tickets.filter((t) => t.status !== "Résolu");
  const criticalTickets = activeTickets.filter((t) => t.urgency.includes("Critique") || t.urgency.includes("Urgente"));

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome with Quick Actions */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Patrimoine Immobilier RDC Sécurisé
              </span>
              <span className="text-xs text-slate-400">Banque Centrale du Congo (BCC) : 1 USD = {bccRate.toLocaleString()} CDF</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Tableau de Bord Bailleur & Diaspora
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl mt-1">
              Supervisez vos baux à Kinshasa et en province, suivez les encaissements Mobile Money & Banque, et générez des quittances légales conformes à la Loi n° 15/025.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="dash-add-property-btn"
              onClick={onOpenAddProperty}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-950/40 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t.addProperty}</span>
              <Sparkles className="w-3 h-3 text-amber-300 ml-1" />
            </button>

            <button
              id="dash-lease-gen-btn"
              onClick={onOpenLeaseGenerator}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition cursor-pointer"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Rédiger Bail Légal</span>
            </button>

            <button
              id="dash-market-estimator-btn"
              onClick={onOpenMarketEstimator}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-medium transition cursor-pointer"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Estimer Loyer IA</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid with Framer Motion Entrance */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Occupancy Rate */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16, scale: 0.98 },
            visible: { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1.0] }
            },
          }}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{t.occupancyRate}</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{occupancyRate}%</span>
            <span className="text-xs text-slate-400">({occupiedProperties}/{totalProperties} biens loués)</span>
          </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ inlineSize: `${occupancyRate}%` }}
            />
          </div>
        </motion.div>

        {/* Collected Rent this month */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16, scale: 0.98 },
            visible: { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1.0] }
            },
          }}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Loyers Encaissés (Août)</span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-emerald-400">
              {primaryCurrency === "USD" ? formatUsd(currentMonthRentUsd) : formatCdf(currentMonthRentUsd * bccRate)}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              {primaryCurrency === "USD" ? `≈ ${formatCdf(currentMonthRentUsd * bccRate)}` : `≈ ${formatUsd(currentMonthRentUsd)}`}
            </div>
          </div>
        </motion.div>

        {/* IRL Tax (Impôt Revenu Locatif RDC 22%) */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16, scale: 0.98 },
            visible: { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1.0] }
            },
          }}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Provision Fiscale IRL (22%)</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-amber-400">
              {primaryCurrency === "USD" ? formatUsd(estimatedIrlTaxUsd) : formatCdf(estimatedIrlTaxUsd * bccRate)}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
              <span>Retenue DGI / DGRK Kinshasa</span>
            </div>
          </div>
        </motion.div>

        {/* Maintenance & Power Generator status */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16, scale: 0.98 },
            visible: { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1.0] }
            },
          }}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Pannes & Groupes</span>
            <div className={`w-8 h-8 rounded-lg ${criticalTickets.length > 0 ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"} flex items-center justify-center`}>
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{activeTickets.length}</span>
            <span className="text-xs text-slate-400">
              {criticalTickets.length > 0 ? `${criticalTickets.length} urgente(s)` : "Équipements OK"}
            </span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Groupe Perkins 65KVA : Vidange en cours
          </div>
        </motion.div>
      </motion.div>

      {/* Main Section: Properties Overview & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: My Properties Portfolio */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Mon Patrimoine Immobilier</h3>
                <p className="text-xs text-slate-400">État d'occupation, équipements d'autonomie et titres fonciers</p>
              </div>
              <button
                onClick={onOpenAddProperty}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Ajouter un bien</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {properties.slice(0, 4).map((prop) => {
                const isRented = prop.status === "Loué";
                return (
                  <div
                    key={prop.id}
                    onClick={() => onSelectProperty(prop)}
                    className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 transition cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={prop.images[0]}
                        alt={prop.title}
                        className="w-16 h-16 rounded-lg object-cover border border-slate-700 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-white line-clamp-1">{prop.title}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isRented
                                ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                                : "bg-amber-950 text-amber-400 border border-amber-800"
                            }`}
                          >
                            {prop.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {prop.commune} ({prop.quartier}) • {prop.superficie} m² • {prop.chambres} ch.
                        </p>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          {prop.equipements.slice(0, 2).map((eq, i) => (
                            <span key={i} className="text-[10px] bg-slate-900 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
                              {eq}
                            </span>
                          ))}
                          <span className="text-[10px] text-slate-400 font-mono">
                            {prop.titreFoncierRef}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <div className="text-base font-bold text-emerald-400">
                        {primaryCurrency === "USD" ? formatUsd(prop.loyerUsd) : formatCdf(prop.loyerUsd * bccRate)}
                        <span className="text-xs text-slate-400 font-normal">/mois</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        + Charges {formatUsd(prop.chargesUsd)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Leases / Contrats en cours */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Baux en Cours (Loi n° 15/025)</h3>
                <p className="text-xs text-slate-400">Contrats légaux, dépôts de garantie et historique des quittances</p>
              </div>
              <button
                onClick={onOpenLeaseGenerator}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Nouveau bail</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {leases.map((lease) => (
                <div
                  key={lease.id}
                  className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-200">{lease.propertyTitle}</span>
                      <span className="text-[10px] bg-sky-950 text-sky-400 px-2 py-0.5 rounded border border-sky-800">
                        Bail Actif ({lease.dureeMois} mois)
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                      <span>Locataire : <strong className="text-slate-200">{lease.tenantName}</strong></span>
                      <span>•</span>
                      <span>Caution : <strong className="text-amber-400">{formatUsd(lease.cautionUsd)}</strong> (3 mois)</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Période : {lease.startDate} au {lease.endDate} • {lease.quittancesCount} quittances émises
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={onOpenLeaseGenerator}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Consulter Contrat</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Recent Payments & Mobile Money / Urgent Alerts */}
        <div className="space-y-4">
          {/* Mobile Money & Bank Payments Received */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Paiements Reçus</h3>
              </div>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-800">
                M-Pesa / Banque
              </span>
            </div>

            <div className="space-y-2.5">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  onClick={() => onSelectTransaction(tx)}
                  className="p-3 rounded-xl bg-slate-800/70 border border-slate-800 hover:border-slate-700 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-200">{tx.tenantName}</span>
                    <span className="text-xs font-bold text-emerald-400">{formatUsd(tx.amountUsd)}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {tx.monthFor} • {tx.paymentMethod}
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-750 text-[10px] text-slate-400">
                    <span className="font-mono">{tx.receiptNumber}</span>
                    <span className="text-emerald-400 flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      Quittance Légale RDC
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Legal Tenancy Checklist (Loi 15/025 RDC) */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-indigo-900/40 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-sky-400 mb-2">
              <FileText className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider">Droit Locatif RDC</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Loi n° 15/025 du 31 déc 2015 :</strong>
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 mt-2">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400">•</span>
                <span>Caution de garantie : plafonnée à <strong>3 mois</strong> pour le logement.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400">•</span>
                <span>Préavis de résiliation : <strong>3 mois</strong> pour le locataire ou bailleur.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400">•</span>
                <span>Retenue fiscale IRL : <strong>22%</strong> reversée aux impôts.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
