import React, { useState } from "react";
import { UserRole, Language } from "../types";
import { DICTIONARY } from "../services/i18n";
import { JimmoLogo } from "./JimmoLogo";
import { 
  Building2, 
  Home, 
  Users, 
  DollarSign, 
  Wrench, 
  Briefcase, 
  Store, 
  Bot, 
  FileText, 
  Globe, 
  Wifi, 
  Sparkles, 
  Search, 
  ArrowRightLeft, 
  ChevronDown,
  RefreshCw,
  Landmark,
  ExternalLink,
  Calculator,
  Plane,
  UserPlus,
  Tag,
  Megaphone,
  Rocket
} from "lucide-react";

interface NavbarProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  primaryCurrency: "USD" | "CDF";
  onToggleCurrency: () => void;
  bccRate: number;
  onRefreshBccRate?: () => void;
  onOpenBccModal?: () => void;
  onOpenKaziAi: () => void;
  onOpenLeaseGen?: () => void;
  onOpenMarketEstimator?: () => void;
  onOpenRegister?: () => void;
  onOpenPricing?: () => void;
  onOpenAds?: () => void;
  onOpenFuture?: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onSelectRole,
  currentLanguage,
  onSelectLanguage,
  primaryCurrency,
  onToggleCurrency,
  bccRate,
  onRefreshBccRate,
  onOpenBccModal,
  onOpenKaziAi,
  onOpenLeaseGen,
  onOpenMarketEstimator,
  onOpenRegister,
  onOpenPricing,
  onOpenAds,
  onOpenFuture,
  activeTab,
  onSelectTab,
}) => {
  const t = DICTIONARY[currentLanguage];
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [rateModalOpen, setRateModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const roles: { id: UserRole; label: string; icon: any; color: string }[] = [
    { id: "Bailleur", label: t.roleBailleur, icon: Home, color: "bg-emerald-500" },
    { id: "Courtier", label: t.roleCourtier, icon: Briefcase, color: "bg-amber-500" },
    { id: "Locataire", label: t.roleLocataire, icon: Users, color: "bg-blue-500" },
    { id: "Prestataire", label: t.rolePrestataire, icon: Wrench, color: "bg-purple-500" },
  ];

  const currentRoleObj = roles.find((r) => r.id.toLowerCase() === currentRole.toLowerCase()) || roles[0];

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    if (onRefreshBccRate) {
      onRefreshBccRate();
    }
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      {/* Top Congolese Bimonetary & Institutional Ribbon */}
      <div className="bg-slate-950 px-4 py-1.5 text-xs text-slate-300 flex flex-wrap items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {/* RDC Flag Ribbon */}
            <span className="inline-flex h-3 w-4.5 overflow-hidden rounded-xs border border-slate-700 shadow-xs">
              <span className="w-1/3 bg-sky-500"></span>
              <span className="w-1/3 bg-amber-400"></span>
              <span className="w-1/3 bg-red-600"></span>
            </span>
            <span className="font-semibold text-slate-200">République Démocratique du Congo</span>
          </div>

          <span className="text-slate-600 hidden sm:inline">•</span>

          {/* BCC Currency Ticker Button */}
          <div className="flex items-center gap-1">
            <button
              id="currency-toggle-btn"
              onClick={onToggleCurrency}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700 transition cursor-pointer text-xs"
              title="Cliquez pour permuter la devise d'affichage (USD / CDF)"
            >
              <ArrowRightLeft className="w-3 h-3 text-emerald-400" />
              <span>{t.rateLabel} :</span>
              <strong className="text-emerald-400">1 USD = {bccRate.toLocaleString()} CDF</strong>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded uppercase font-mono font-bold">
                {primaryCurrency}
              </span>
            </button>

            <button
              id="rate-refresh-btn"
              onClick={() => {
                if (onOpenBccModal) {
                  onOpenBccModal();
                } else {
                  setRateModalOpen(true);
                }
              }}
              className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer"
              title="Informations Taux Officiel BCC"
            >
              <Landmark className="w-3 h-3 text-amber-400" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-1 sm:mt-0 flex-wrap">
          {/* S'inscrire / Connexion Button */}
          {onOpenRegister && (
            <button
              id="register-nav-btn"
              onClick={onOpenRegister}
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition text-xs font-semibold px-2 py-0.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 cursor-pointer"
            >
              <UserPlus className="w-3 h-3" />
              <span>S'inscrire / Connexion</span>
            </button>
          )}

          {/* Tarifs shortcut */}
          {onOpenPricing && (
            <button
              id="pricing-nav-btn"
              onClick={onOpenPricing}
              className="flex items-center gap-1 text-sky-400 hover:text-sky-300 transition text-xs font-medium px-2 py-0.5 rounded-lg bg-sky-950/50 border border-sky-500/30 cursor-pointer"
            >
              <Tag className="w-3 h-3" />
              <span>Tarifs</span>
            </button>
          )}

          {/* Espace Pub shortcut */}
          {onOpenAds && (
            <button
              id="ads-nav-btn"
              onClick={onOpenAds}
              className="hidden lg:flex items-center gap-1 text-amber-400 hover:text-amber-300 transition text-xs font-medium px-2 py-0.5 rounded-lg bg-amber-950/50 border border-amber-500/30 cursor-pointer"
            >
              <Megaphone className="w-3 h-3" />
              <span>Espace Pub</span>
            </button>
          )}

          {/* Futur R&D shortcut */}
          {onOpenFuture && (
            <button
              id="future-nav-btn"
              onClick={onOpenFuture}
              className="hidden xl:flex items-center gap-1 text-purple-400 hover:text-purple-300 transition text-xs font-medium px-2 py-0.5 rounded-lg bg-purple-950/50 border border-purple-500/30 cursor-pointer"
            >
              <Rocket className="w-3 h-3" />
              <span>R&D Futur</span>
            </button>
          )}

          {/* Quick AI Estimator link */}
          {onOpenMarketEstimator && (
            <button
              id="market-estimator-nav-btn"
              onClick={onOpenMarketEstimator}
              className="hidden md:flex items-center gap-1 text-amber-400 hover:text-amber-300 transition text-xs font-medium cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Mercuriale</span>
            </button>
          )}

          {/* Connectivity Status */}
          <div className="flex items-center gap-1 text-emerald-400 text-xs">
            <Wifi className="w-3 h-3" />
            <span className="hidden lg:inline">Sync RDC</span>
          </div>

          {/* Language Selector (FR / LN / SW) */}
          <div className="relative">
            <button
              id="lang-dropdown-btn"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white px-2.5 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-xs transition cursor-pointer"
            >
              <Globe className="w-3 h-3 text-emerald-400" />
              <span className="uppercase font-bold">{currentLanguage}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            {langDropdownOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-slate-900 border border-slate-700 rounded-xl shadow-xl py-1 z-50">
                <button
                  onClick={() => {
                    onSelectLanguage("fr");
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-800 flex items-center justify-between cursor-pointer ${
                    currentLanguage === "fr" ? "text-emerald-400 font-bold bg-slate-800/40" : "text-slate-300"
                  }`}
                >
                  <span>Français</span>
                  <span className="text-[10px] text-slate-400">FR</span>
                </button>
                <button
                  onClick={() => {
                    onSelectLanguage("ln");
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-800 flex items-center justify-between cursor-pointer ${
                    currentLanguage === "ln" ? "text-emerald-400 font-bold bg-slate-800/40" : "text-slate-300"
                  }`}
                >
                  <span>Lingála</span>
                  <span className="text-[10px] text-slate-400">LN</span>
                </button>
                <button
                  onClick={() => {
                    onSelectLanguage("sw");
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-800 flex items-center justify-between cursor-pointer ${
                    currentLanguage === "sw" ? "text-emerald-400 font-bold bg-slate-800/40" : "text-slate-300"
                  }`}
                >
                  <span>Kiswahili</span>
                  <span className="text-[10px] text-slate-400">SW</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Platform Name */}
          <div 
            id="navbar-brand-link"
            onClick={() => onSelectTab("dashboard")} 
            className="flex items-center gap-3 cursor-pointer group select-none py-0.5"
          >
            <JimmoLogo size="md" showTagline={true} variant="light" />
          </div>

          {/* Actions & Role Switcher */}
          <div className="flex items-center gap-3">
            {/* AI Assistant button */}
            <button
              id="open-ai-chat-btn"
              onClick={onOpenKaziAi}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-950/40 transition cursor-pointer"
            >
              <Bot className="w-4 h-4 text-sky-200" />
              <span>Kazi-AI</span>
              <span className="text-[10px] bg-white/20 px-1 rounded hidden sm:inline">Loi 15/025</span>
            </button>

            {/* Congolese Lease Generator shortcut */}
            {onOpenLeaseGen && (
              <button
                id="open-lease-gen-btn"
                onClick={onOpenLeaseGen}
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition cursor-pointer"
                title="Générer un contrat de bail conforme Loi 15/025"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>{t.navLeaseGenerator}</span>
              </button>
            )}

            {/* Role Switcher */}
            <div className="relative">
              <button
                id="role-switcher-btn"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-600 text-xs font-medium transition cursor-pointer"
              >
                <div className={`w-2.5 h-2.5 rounded-full ${currentRoleObj.color}`}></div>
                <div className="text-left hidden sm:block">
                  <div className="text-[10px] text-slate-400 uppercase leading-none">Espace</div>
                  <div className="text-slate-100 font-semibold">{currentRoleObj.label}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-60 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-1.5 z-50">
                  <div className="px-2.5 py-1.5 text-[10px] font-semibold text-slate-400 border-b border-slate-800 uppercase tracking-wider">
                    Changer de profil
                  </div>
                  {roles.map((r) => {
                    const Icon = r.icon;
                    const isSelected = currentRole.toLowerCase() === r.id.toLowerCase();
                    return (
                      <button
                        key={r.id}
                        onClick={() => {
                          onSelectRole(r.id);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs transition text-left mt-1 cursor-pointer ${
                          isSelected
                            ? "bg-slate-800 text-emerald-400 font-semibold border border-slate-700"
                            : "text-slate-300 hover:bg-slate-800/60"
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${r.color} text-white`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="flex-1">{r.label}</span>
                        {isSelected && <span className="text-xs font-bold text-emerald-400">✓</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pt-3 mt-2 border-t border-slate-800/60 no-scrollbar">
          <button
            id="tab-dashboard"
            onClick={() => onSelectTab("dashboard")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer ${
              activeTab === "dashboard"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>{t.navDashboard}</span>
          </button>

          <button
            id="tab-properties"
            onClick={() => onSelectTab("properties")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer ${
              activeTab === "properties"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{t.navProperties}</span>
          </button>

          <button
            id="tab-tenants"
            onClick={() => onSelectTab("tenants")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer ${
              activeTab === "tenants"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{t.navTenants}</span>
          </button>

          <button
            id="tab-finances"
            onClick={() => onSelectTab("finances")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer ${
              activeTab === "finances"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>{t.navFinances}</span>
          </button>

          <button
            id="tab-maintenance"
            onClick={() => onSelectTab("maintenance")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer ${
              activeTab === "maintenance"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>{t.navMaintenance}</span>
          </button>

          <button
            id="tab-marketplace"
            onClick={() => onSelectTab("marketplace")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer ${
              activeTab === "marketplace"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>{t.navMarketplace}</span>
          </button>

          <button
            id="tab-calculateur"
            onClick={() => onSelectTab("calculateur")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer ${
              activeTab === "calculateur"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span>Calcul Direct RDC</span>
          </button>

          <button
            id="tab-diaspora"
            onClick={() => onSelectTab("diaspora")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer ${
              activeTab === "diaspora"
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/40 font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            <Plane className="w-3.5 h-3.5 text-sky-400" />
            <span>Gestion Diaspora & Suivi</span>
          </button>
        </nav>
      </div>

      {/* BCC Exchange Rate Details Modal */}
      {rateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Banque Centrale du Congo (BCC)</h3>
                  <p className="text-[11px] text-slate-400">Système de Double Monnaie USD / CDF</p>
                </div>
              </div>
              <button
                onClick={() => setRateModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 bg-slate-800 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-[11px] text-slate-400 font-medium">Cours Indicatif Officiel :</div>
              <div className="text-2xl font-bold text-emerald-400">
                1 USD = {bccRate.toLocaleString()} CDF
              </div>
              <div className="text-[11px] text-slate-400">
                1 CDF = {(1 / bccRate).toFixed(6)} USD
              </div>
              <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-800 flex items-center justify-between">
                <span>Source : Banque Centrale du Congo</span>
                <a
                  href="https://bcc.cd/marche-des-changes/cours-de-change"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 font-mono text-[10px]"
                >
                  <span>bcc.cd</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="text-xs text-slate-300 space-y-1.5 bg-slate-800/40 p-3 rounded-xl border border-slate-800">
              <p>
                💡 <strong>Règle de conversion :</strong> Tous les loyers, charges, cautions légales (Loi 15/025), retenues fiscales IRL 22% et commissions sont calculés instantanément dans les deux devises.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleRefreshClick}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-emerald-400" : ""}`} />
                <span>{t.refreshRate}</span>
              </button>

              <button
                onClick={() => {
                  onToggleCurrency();
                  setRateModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer"
              >
                Basculer vers {primaryCurrency === "USD" ? "CDF" : "USD"}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
