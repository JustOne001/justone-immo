import React, { useState, useEffect } from "react";
import { UserRole, Language, Property, Tenant, Lease, PaymentTransaction, MaintenanceTicket } from "./types";
import { INITIAL_PROPERTIES, INITIAL_TENANTS, INITIAL_LEASES, INITIAL_TRANSACTIONS, INITIAL_PROVIDERS, INITIAL_TICKETS } from "./data/mockData";
import { DEFAULT_BCC_EXCHANGE_RATE } from "./services/currency";
import { DICTIONARY } from "./services/i18n";
import { fetchBccExchangeRate, BccExchangeRateData } from "./services/api";
import { Navbar } from "./components/Navbar";
import { DashboardBailleur } from "./components/DashboardBailleur";
import { DashboardLocataire } from "./components/DashboardLocataire";
import { DashboardCourtier } from "./components/DashboardCourtier";
import { PropertiesModule } from "./components/PropertiesModule";
import { TenantManagementModule } from "./components/TenantManagementModule";
import { FinancesModule } from "./components/FinancesModule";
import { MaintenanceModule } from "./components/MaintenanceModule";
import { MarketplaceSearch } from "./components/MarketplaceSearch";
import { LeaseGeneratorModal } from "./components/LeaseGeneratorModal";
import { MarketEstimatorModal } from "./components/MarketEstimatorModal";
import { KaziAiAssistantModal } from "./components/KaziAiAssistantModal";
import { MobileMoneyModal } from "./components/MobileMoneyModal";
import { BccRateModal } from "./components/BccRateModal";
import { CalculateurDirectRDC } from "./components/CalculateurDirectRDC";
import { InscriptionModal } from "./components/InscriptionModal";
import { ModalitesInscriptionModal } from "./components/ModalitesInscriptionModal";
import { EspacePublicitaireModal } from "./components/EspacePublicitaireModal";
import { TarificationModal } from "./components/TarificationModal";
import { GestionDistanceDiaspora } from "./components/GestionDistanceDiaspora";
import { FuturInnovationsModal } from "./components/FuturInnovationsModal";
import { JimmoLogo } from "./components/JimmoLogo";
import { 
  Building2, 
  Users, 
  FileText, 
  Wrench, 
  Search, 
  Bot, 
  TrendingUp, 
  ShieldCheck, 
  DollarSign,
  Plus,
  Megaphone,
  Sparkles,
  Plane,
  Tag,
  Rocket,
  Calculator,
  UserPlus
} from "lucide-react";

export default function App() {
  // Global state
  const [currentRole, setCurrentRole] = useState<UserRole>("Bailleur");
  const [currentLanguage, setCurrentLanguage] = useState<Language>("fr");
  const [primaryCurrency, setPrimaryCurrency] = useState<"USD" | "CDF">("USD");
  const [bccRate, setBccRate] = useState<number>(DEFAULT_BCC_EXCHANGE_RATE);
  const [bccData, setBccData] = useState<BccExchangeRateData>({
    usd_to_cdf: DEFAULT_BCC_EXCHANGE_RATE,
    buyer_rate: 2845,
    seller_rate: 2855,
    indicative_rate: DEFAULT_BCC_EXCHANGE_RATE,
    source: "Banque Centrale du Congo (BCC)",
    source_url: "https://bcc.cd/marche-des-changes/cours-de-change",
    is_live: true,
    status: "SYNCHRONIZED",
    published_date: new Date().toISOString().split("T")[0],
    updated_at: new Date().toISOString(),
  });
  const [isBccModalOpen, setIsBccModalOpen] = useState(false);
  const [isBccRefreshing, setIsBccRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // New Modals State for User Requests 1-7
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isModalitesOpen, setIsModalitesOpen] = useState(false);
  const [isAdsOpen, setIsAdsOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isFutureOpen, setIsFutureOpen] = useState(false);

  const loadBccRate = async (forceRefresh = false) => {
    setIsBccRefreshing(true);
    try {
      const data = await fetchBccExchangeRate(forceRefresh);
      setBccData(data);
      if (data.usd_to_cdf) {
        setBccRate(data.usd_to_cdf);
      }
    } catch (e) {
      console.error("Failed to load BCC exchange rate:", e);
    } finally {
      setIsBccRefreshing(false);
    }
  };

  useEffect(() => {
    loadBccRate();
  }, []);

  // Domain data state
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [tenants, setTenants] = useState<Tenant[]>(INITIAL_TENANTS);
  const [leases, setLeases] = useState<Lease[]>(INITIAL_LEASES);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(INITIAL_TRANSACTIONS);
  const [tickets, setTickets] = useState<MaintenanceTicket[]>(INITIAL_TICKETS);
  const [providers] = useState(INITIAL_PROVIDERS);

  // Modal states
  const [isLeaseGenOpen, setIsLeaseGenOpen] = useState(false);
  const [leaseGenProp, setLeaseGenProp] = useState<Property | null>(null);
  const [leaseGenTenant, setLeaseGenTenant] = useState<Tenant | null>(null);

  const [isMarketEstimatorOpen, setIsMarketEstimatorOpen] = useState(false);
  const [isKaziAiOpen, setIsKaziAiOpen] = useState(false);
  const [isMobileMoneyOpen, setIsMobileMoneyOpen] = useState(false);
  const [selectedPropForPayment, setSelectedPropForPayment] = useState<Property>(properties[0]);

  // Selected item states for detail views
  const [selectedPropForDetails, setSelectedPropForDetails] = useState<Property | null>(null);
  const [selectedTxForReceipt, setSelectedTxForReceipt] = useState<PaymentTransaction | null>(null);

  const t = DICTIONARY[currentLanguage];

  // Actions
  const handleAddProperty = (newProp: Property) => {
    setProperties((prev) => [newProp, ...prev]);
  };

  const handleUpdateProperty = (updated: Property) => {
    setProperties((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleSaveLease = (newLease: Lease) => {
    setLeases((prev) => [newLease, ...prev]);
  };

  const handleAddTicket = (newTk: MaintenanceTicket) => {
    setTickets((prev) => [newTk, ...prev]);
  };

  const handleUpdateTicketStatus = (ticketId: string, status: any, providerId?: string, cost?: number) => {
    setTickets((prev) =>
      prev.map((tk) => (tk.id === ticketId ? { ...tk, status, assignedProviderId: providerId, costUsd: cost } : tk))
    );
  };

  const handlePaymentSuccess = (newTx: PaymentTransaction) => {
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleOpenLeaseForProp = (prop: Property) => {
    setLeaseGenProp(prop);
    setLeaseGenTenant(tenants[0]);
    setIsLeaseGenOpen(true);
  };

  const handleOpenLeaseForTenant = (tenant: Tenant) => {
    setLeaseGenTenant(tenant);
    setLeaseGenProp(properties[0]);
    setIsLeaseGenOpen(true);
  };

  const handleStartBookingFromMarket = (prop: Property) => {
    setSelectedPropForPayment(prop);
    setIsMobileMoneyOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Responsive Navigation Header */}
      <Navbar
        currentRole={currentRole}
        onSelectRole={setCurrentRole}
        currentLanguage={currentLanguage}
        onSelectLanguage={setCurrentLanguage}
        primaryCurrency={primaryCurrency}
        onToggleCurrency={() => setPrimaryCurrency(primaryCurrency === "USD" ? "CDF" : "USD")}
        bccRate={bccRate}
        onOpenBccModal={() => setIsBccModalOpen(true)}
        onRefreshBccRate={() => loadBccRate(true)}
        onOpenKaziAi={() => setIsKaziAiOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenAds={() => setIsAdsOpen(true)}
        onOpenFuture={() => setIsFutureOpen(true)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Interactive Advertising Banner (Monétisation & Annonceurs RDC) */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/30 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500 text-slate-950 uppercase tracking-wider shrink-0">
              Espace Partenaire
            </span>
            <div className="text-xs">
              <span className="font-bold text-white">Rawbank RDC & Equity BCDC :</span>
              <span className="text-slate-300 ml-1.5 hidden md:inline">
                Financez vos travaux et sécurisez vos cautions locatives avec nos comptes certifiés Diaspora & Bailleurs.
              </span>
              <span className="text-slate-300 ml-1.5 md:hidden">
                Comptes certifiés Diaspora & Bailleurs en RDC.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsAdsOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition cursor-pointer flex items-center gap-1"
            >
              <Megaphone className="w-3 h-3" />
              <span>Annoncer ici</span>
            </button>
            <button
              onClick={() => setIsPricingOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
            >
              Forfaits
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Active Tab Router */}
        {activeTab === "dashboard" && (
          <>
            {currentRole === "Bailleur" && (
              <DashboardBailleur
                properties={properties}
                tenants={tenants}
                leases={leases}
                transactions={transactions}
                tickets={tickets}
                bccRate={bccRate}
                primaryCurrency={primaryCurrency}
                currentLanguage={currentLanguage}
                onOpenAddProperty={() => setActiveTab("properties")}
                onOpenLeaseGenerator={() => {
                  setLeaseGenProp(properties[0]);
                  setLeaseGenTenant(tenants[0]);
                  setIsLeaseGenOpen(true);
                }}
                onOpenMarketEstimator={() => setIsMarketEstimatorOpen(true)}
                onSelectProperty={(prop) => {
                  setSelectedPropForDetails(prop);
                  setActiveTab("properties");
                }}
                onSelectTransaction={(tx) => {
                  setSelectedTxForReceipt(tx);
                  setActiveTab("finances");
                }}
              />
            )}

            {currentRole === "Locataire" && (
              <DashboardLocataire
                leases={leases}
                properties={properties}
                transactions={transactions}
                tickets={tickets}
                bccRate={bccRate}
                primaryCurrency={primaryCurrency}
                currentLanguage={currentLanguage}
                onOpenPaymentModal={(prop) => {
                  setSelectedPropForPayment(prop);
                  setIsMobileMoneyOpen(true);
                }}
                onOpenReportTicket={() => setActiveTab("maintenance")}
                onSelectReceipt={(tx) => {
                  setSelectedTxForReceipt(tx);
                  setActiveTab("finances");
                }}
              />
            )}

            {currentRole === "Courtier" && (
              <DashboardCourtier
                properties={properties}
                tenants={tenants}
                leases={leases}
                transactions={transactions}
                bccRate={bccRate}
                primaryCurrency={primaryCurrency}
                currentLanguage={currentLanguage}
                onOpenAddProperty={() => setActiveTab("properties")}
                onOpenLeaseGenerator={() => {
                  setLeaseGenProp(properties[0]);
                  setLeaseGenTenant(tenants[0]);
                  setIsLeaseGenOpen(true);
                }}
                onOpenMarketEstimator={() => setIsMarketEstimatorOpen(true)}
                onSelectProperty={(prop) => {
                  setSelectedPropForDetails(prop);
                  setActiveTab("properties");
                }}
              />
            )}
          </>
        )}

        {activeTab === "properties" && (
          <PropertiesModule
            properties={properties}
            onAddProperty={handleAddProperty}
            onUpdateProperty={handleUpdateProperty}
            bccRate={bccRate}
            primaryCurrency={primaryCurrency}
            currentLanguage={currentLanguage}
            onOpenLeaseGeneratorForProperty={handleOpenLeaseForProp}
            selectedPropertyForDetails={selectedPropForDetails}
            onCloseDetails={() => setSelectedPropForDetails(null)}
            onSelectPropertyForDetails={setSelectedPropForDetails}
          />
        )}

        {activeTab === "tenants" && (
          <TenantManagementModule
            tenants={tenants}
            properties={properties}
            bccRate={bccRate}
            currentLanguage={currentLanguage}
            onOpenLeaseGeneratorForTenant={handleOpenLeaseForTenant}
          />
        )}

        {activeTab === "finances" && (
          <FinancesModule
            transactions={transactions}
            leases={leases}
            properties={properties}
            bccRate={bccRate}
            primaryCurrency={primaryCurrency}
            currentLanguage={currentLanguage}
            selectedTransactionForReceipt={selectedTxForReceipt}
            onCloseReceipt={() => setSelectedTxForReceipt(null)}
            onSelectTransactionForReceipt={setSelectedTxForReceipt}
          />
        )}

        {activeTab === "maintenance" && (
          <MaintenanceModule
            tickets={tickets}
            providers={providers}
            properties={properties}
            tenants={tenants}
            bccRate={bccRate}
            primaryCurrency={primaryCurrency}
            currentLanguage={currentLanguage}
            onAddTicket={handleAddTicket}
            onUpdateTicketStatus={handleUpdateTicketStatus}
          />
        )}

        {activeTab === "marketplace" && (
          <MarketplaceSearch
            properties={properties}
            bccRate={bccRate}
            primaryCurrency={primaryCurrency}
            currentLanguage={currentLanguage}
            onSelectProperty={(prop) => {
              setSelectedPropForDetails(prop);
              setActiveTab("properties");
            }}
            onStartBooking={handleStartBookingFromMarket}
          />
        )}

        {/* Tab 1: Calcul Direct de tout ce qui doit l'être */}
        {activeTab === "calculateur" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-amber-400" />
                  Calculateur Financier Direct RDC & Devis Immobiliers
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Plafonnement légal de garantie (Loi 15/025), Retenue fiscale IRL 22% (DGI/DGRK), Charges opérationnelles & Rendement net.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPricingOpen(true)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition"
                >
                  Voir les Tarifs Plateforme
                </button>
              </div>
            </div>

            <CalculateurDirectRDC bccRate={bccRate} />
          </div>
        )}

        {/* Tab 6: Avantages pour une gestion à distance et un suivi (Diaspora) */}
        {activeTab === "diaspora" && (
          <GestionDistanceDiaspora
            bccRate={bccRate}
            properties={properties}
            transactions={transactions}
            tickets={tickets}
            onOpenLeaseGen={() => {
              setLeaseGenProp(properties[0]);
              setLeaseGenTenant(tenants[0]);
              setIsLeaseGenOpen(true);
            }}
            onOpenMobileMoney={() => {
              setSelectedPropForPayment(properties[0]);
              setIsMobileMoneyOpen(true);
            }}
            onOpenKaziAi={() => setIsKaziAiOpen(true)}
          />
        )}
      </main>

      {/* Footer Jimmo.rdc */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8 mt-12 text-slate-400">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs border-b border-slate-800/60 pb-6">
            <div className="space-y-2">
              <JimmoLogo size="sm" showTagline={true} />
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Première plateforme de gestion locative numérique 100% conforme à la législation de la République Démocratique du Congo (Loi n° 15/025 & Fiscalité DGI/DGRK).
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider">Solutions & Cadre RDC</h5>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <button onClick={() => setActiveTab("calculateur")} className="hover:text-emerald-400 transition cursor-pointer">
                    • Calcul Direct des Baux & Frais
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab("diaspora")} className="hover:text-sky-400 transition cursor-pointer">
                    • Télé-Gestion & Suivi Diaspora
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsModalitesOpen(true)} className="hover:text-amber-400 transition cursor-pointer">
                    • Modalités d'Inscription & Charte
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsPricingOpen(true)} className="hover:text-purple-400 transition cursor-pointer">
                    • Tarifs & Formules d'Utilisation
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider">Régie & Partenaires</h5>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <button onClick={() => setIsAdsOpen(true)} className="hover:text-amber-400 transition cursor-pointer">
                    • Espace Publicitaire Justone Ads
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsFutureOpen(true)} className="hover:text-purple-400 transition cursor-pointer">
                    • Feuille de Route & R&D Futur
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsBccModalOpen(true)} className="hover:text-emerald-400 transition cursor-pointer">
                    • Taux de Change Officiel BCC
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsKaziAiOpen(true)} className="hover:text-sky-400 transition cursor-pointer">
                    • Assistant Juridique Kazi-AI
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider">Contact & Inscription</h5>
              <p className="text-[11px] text-slate-400">
                Immeuble Crown Tower, Boulevard du 30 Juin, Gombe, Kinshasa, RDC
              </p>
              <button
                onClick={() => setIsRegisterOpen(true)}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition shadow-md shadow-emerald-950 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Créer un Compte Jimmo.rdc</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsBccModalOpen(true)}
                className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/50 text-sky-400 font-mono transition cursor-pointer flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>BCC Officiel : 1 USD = {bccRate.toLocaleString()} CDF</span>
              </button>
              <a
                href="https://bcc.cd/marche-des-changes/cours-de-change"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-sky-300 transition text-[11px] underline"
              >
                Source officielle : bcc.cd/marche-des-changes
              </a>
            </div>

            <div className="text-slate-500 text-[11px]">
              © {new Date().getFullYear()} Justone Immo (Jimmo.rdc) • Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Kazi-AI Quick Assistant Bubble */}
      <button
        id="floating-kazi-ai-trigger"
        onClick={() => setIsKaziAiOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs shadow-2xl shadow-emerald-950/60 border border-emerald-400/30 transition transform hover:scale-105 cursor-pointer"
        title="Ouvrir le Conseiller Juridique Kazi-AI"
      >
        <Bot className="w-5 h-5 text-amber-300" />
        <span className="hidden sm:inline">Kazi-AI (Juridique & Loi 15/025)</span>
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
      </button>

      {/* Modals */}
      <BccRateModal
        isOpen={isBccModalOpen}
        onClose={() => setIsBccModalOpen(false)}
        bccData={bccData}
        onRefresh={() => loadBccRate(true)}
        isRefreshing={isBccRefreshing}
      />

      <InscriptionModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        bccRate={bccRate}
        onSuccessRegister={() => {}}
        onOpenModalites={() => {
          setIsRegisterOpen(false);
          setIsModalitesOpen(true);
        }}
      />

      <ModalitesInscriptionModal
        isOpen={isModalitesOpen}
        onClose={() => setIsModalitesOpen(false)}
        onOpenRegister={() => {
          setIsModalitesOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      <EspacePublicitaireModal
        isOpen={isAdsOpen}
        onClose={() => setIsAdsOpen(false)}
        bccRate={bccRate}
      />

      <TarificationModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        bccRate={bccRate}
        onSelectPlan={() => {
          setIsRegisterOpen(true);
        }}
      />

      <FuturInnovationsModal
        isOpen={isFutureOpen}
        onClose={() => setIsFutureOpen(false)}
      />

      <LeaseGeneratorModal
        isOpen={isLeaseGenOpen}
        onClose={() => setIsLeaseGenOpen(false)}
        properties={properties}
        tenants={tenants}
        bccRate={bccRate}
        initialProperty={leaseGenProp}
        initialTenant={leaseGenTenant}
        onSaveLease={handleSaveLease}
      />

      <MarketEstimatorModal
        isOpen={isMarketEstimatorOpen}
        onClose={() => setIsMarketEstimatorOpen(false)}
        bccRate={bccRate}
        primaryCurrency={primaryCurrency}
        currentLanguage={currentLanguage}
      />

      <KaziAiAssistantModal
        isOpen={isKaziAiOpen}
        onClose={() => setIsKaziAiOpen(false)}
        currentLanguage={currentLanguage}
        bccRate={bccRate}
      />

      <MobileMoneyModal
        isOpen={isMobileMoneyOpen}
        onClose={() => setIsMobileMoneyOpen(false)}
        property={selectedPropForPayment}
        bccRate={bccRate}
        primaryCurrency={primaryCurrency}
        currentLanguage={currentLanguage}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}

