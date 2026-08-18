import React, { useState } from "react";
import { 
  X, 
  User, 
  Home, 
  Plane, 
  Briefcase, 
  Key, 
  Wrench, 
  Phone, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Upload, 
  ArrowRight,
  Lock,
  Smartphone,
  Info
} from "lucide-react";
import { UserRole, ProfileCategory, UserProfile } from "../types";
import { JimmoLogo } from "./JimmoLogo";

interface InscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessRegister: (userProfile: UserProfile) => void;
  bccRate?: number;
  onOpenModalites?: () => void;
}

export const InscriptionModal: React.FC<InscriptionModalProps> = ({
  isOpen,
  onClose,
  onSuccessRegister,
  onOpenModalites,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedCategory, setSelectedCategory] = useState<ProfileCategory>("bailleur_resident");
  const [authMethod, setAuthMethod] = useState<"phone" | "email">("phone");
  
  // Form fields
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [countryResidence, setCountryResidence] = useState("République Démocratique du Congo");
  const [cityCommune, setCityCommune] = useState("Kinshasa (Gombe)");
  const [idType, setIdType] = useState<"carte_electeur" | "passeport" | "permis" | "rccm">("carte_electeur");
  const [idNumber, setIdNumber] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const categories = [
    {
      id: "bailleur_resident" as ProfileCategory,
      title: "Bailleur Résident RDC",
      desc: "Propriétaire d'appartements, villas ou parcelles résidant en RDC.",
      icon: Home,
      color: "border-emerald-500 bg-emerald-500/10 text-emerald-400",
      badge: "Gestion Directe",
    },
    {
      id: "diaspora" as ProfileCategory,
      title: "Propriétaire Diaspora RDC",
      desc: "Congolais résidant à l'étranger (Europe, Amérique, etc.) souhaitant sécuriser et télésurveiller ses biens.",
      icon: Plane,
      color: "border-sky-500 bg-sky-500/10 text-sky-400",
      badge: "Suivi à Distance 24/7",
    },
    {
      id: "courtier_agence" as ProfileCategory,
      title: "Agence & Courtier Agréé",
      desc: "Professionnel de l'immobilier, gestionnaire de patrimoine ou cabinet d'affaires.",
      icon: Briefcase,
      color: "border-amber-500 bg-amber-500/10 text-amber-400",
      badge: "Multi-biens & RCCM",
    },
    {
      id: "locataire" as ProfileCategory,
      title: "Locataire / Candidat",
      desc: "Particulier ou entreprise en recherche de logement ou déjà occupant.",
      icon: Key,
      color: "border-blue-500 bg-blue-500/10 text-blue-400",
      badge: "Paiement Mobile Money",
    },
    {
      id: "prestataire" as ProfileCategory,
      title: "Artisan & Prestataire Vérifié",
      desc: "Électricien groupes électrogènes, plombier forages, climaticien ou société de sécurité.",
      icon: Wrench,
      color: "border-purple-500 bg-purple-500/10 text-purple-400",
      badge: "Interventions Certifiées",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSuccessRegister({
          name: fullName || "Nouvel Utilisateur",
          category: selectedCategory,
          email,
          phone: phoneNumber,
          cityCommune,
        });
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-900 p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <JimmoLogo size="md" />
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg">
                Inscription & Création de Compte Sécurisé
              </h3>
              <p className="text-xs text-slate-400">
                Plateforme officielle de gestion immobilière Justone Immo (Jimmo.rdc)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps indicator */}
        <div className="bg-slate-950/80 px-6 py-3 border-b border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${step >= 1 ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-400"}`}>
              1
            </span>
            <span className={step === 1 ? "text-emerald-400 font-semibold" : "text-slate-400"}>
              Choix du Profil
            </span>
          </div>
          <div className="w-8 h-0.5 bg-slate-800"></div>
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${step >= 2 ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-400"}`}>
              2
            </span>
            <span className={step === 2 ? "text-emerald-400 font-semibold" : "text-slate-400"}>
              Mode & Coordonnées
            </span>
          </div>
          <div className="w-8 h-0.5 bg-slate-800"></div>
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${step >= 3 ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-400"}`}>
              3
            </span>
            <span className={step === 3 ? "text-emerald-400 font-semibold" : "text-slate-400"}>
              Vérification KYC & Validation
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-white">Compte Créé avec Succès !</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Bienvenue sur Justone Immo. Votre espace de gestion est prêt avec toutes les garanties légales conformes à la Loi n° 15/025.
              </p>
            </div>
          ) : (
            <>
              {/* STEP 1: Profile Selection */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="text-center space-y-1 mb-4">
                    <h4 className="text-base font-bold text-white">Quel est votre statut principal ?</h4>
                    <p className="text-xs text-slate-400">
                      Chaque profil bénéficie d'outils sur-mesure pour la gestion, la fiscalité et les paiements en RDC.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {categories.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = selectedCategory === cat.id;
                      return (
                        <div
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? `${cat.color} shadow-lg shadow-black/40`
                              : "border-slate-800 bg-slate-950/40 hover:border-slate-700 text-slate-300"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="p-2 rounded-xl bg-slate-900/80">
                                <Icon className="w-5 h-5" />
                              </div>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300">
                                {cat.badge}
                              </span>
                            </div>
                            <h5 className="font-bold text-sm text-white">{cat.title}</h5>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                              {cat.desc}
                            </p>
                          </div>

                          <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-end text-xs font-semibold">
                            {isSelected ? (
                              <span className="text-emerald-400 flex items-center gap-1">
                                Sélectionné ✓
                              </span>
                            ) : (
                              <span className="text-slate-500">Choisir</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-end pt-4 border-t border-slate-800">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-950"
                    >
                      <span>Continuer vers les Coordonnées</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Auth Method & Details */}
              {step === 2 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Mode de Connexion & Coordonnées</h4>
                      <p className="text-xs text-slate-400">
                        Profil sélectionné : <strong className="text-emerald-400">{categories.find(c => c.id === selectedCategory)?.title}</strong>
                      </p>
                    </div>
                    <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                      <button
                        type="button"
                        onClick={() => setAuthMethod("phone")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                          authMethod === "phone" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                        Téléphone / OTP
                      </button>
                      <button
                        type="button"
                        onClick={() => setAuthMethod("email")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                          authMethod === "email" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                        Email & Mot de passe
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                    <div>
                      <label className="text-xs text-slate-300 font-medium block mb-1">
                        Nom et Prénom (ou Raison Sociale) *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ex: Christian Mukendi / Cabinet ImmoKin"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-300 font-medium block mb-1">
                          Numéro Téléphone / Mobile Money *
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="+243 81 234 5678 (M-Pesa, Orange, Airtel)"
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 font-medium block mb-1">
                          Adresse Email
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="exemple@domaine.cd"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-300 font-medium block mb-1">
                          Pays de Résidence
                        </label>
                        <input
                          type="text"
                          value={countryResidence}
                          onChange={(e) => setCountryResidence(e.target.value)}
                          placeholder="Ex: RDC, France, Belgique, USA, Canada..."
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 font-medium block mb-1">
                          Ville / Commune Principale
                        </label>
                        <input
                          type="text"
                          value={cityCommune}
                          onChange={(e) => setCityCommune(e.target.value)}
                          placeholder="Ex: Kinshasa (Gombe, Ngaliema, Limete...)"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
                    >
                      Retour
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-950"
                    >
                      <span>Vérification & Finalisation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Verification KYC & Terms */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h4 className="text-sm font-bold text-white">3. Modalités & Pièces Justificatives (KYC)</h4>
                    <p className="text-xs text-slate-400">
                      Garantit la sécurité des transactions foncières et la conformité légale en RDC.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-300 font-medium block mb-1">
                          Type de Pièce d'Identité
                        </label>
                        <select
                          value={idType}
                          onChange={(e) => setIdType(e.target.value as any)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                        >
                          <option value="carte_electeur">Carte d'Électeur CENI (RDC)</option>
                          <option value="passeport">Passeport National / International</option>
                          <option value="permis">Permis de Conduire RDC</option>
                          <option value="rccm">Numéro RCCM (Entreprise / Agence)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 font-medium block mb-1">
                          Numéro de la Pièce / Registre
                        </label>
                        <input
                          type="text"
                          value={idNumber}
                          onChange={(e) => setIdNumber(e.target.value)}
                          placeholder="Ex: CENI-294029148 / RCCM-KIN-1428"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900/60 rounded-xl border border-dashed border-slate-700 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <Upload className="w-4 h-4 text-emerald-400" />
                        <span>Téléverser un scan ou photo de la pièce (Optionnel à l'inscription)</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert("Scan de pièce enregistré en local pour la session.")}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[11px] font-semibold"
                      >
                        Parcourir
                      </button>
                    </div>

                    {/* Terms & Conditions Acceptance */}
                    <div className="p-3.5 bg-blue-950/30 rounded-xl border border-blue-800/40 space-y-2">
                      <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={acceptTerms}
                          onChange={(e) => setAcceptTerms(e.target.checked)}
                          className="mt-0.5 rounded border-slate-700 accent-emerald-500"
                        />
                        <span className="leading-relaxed">
                          J'accepte les <strong>Modalités d'Inscription</strong> et m'engage à respecter les dispositions impératives de la <strong>Loi n° 15/025</strong> sur les baux à loyer en RDC (plafonnement de caution à 3 mois pour le résidentiel, quittances conformes, retenue fiscale IRL 22%).
                        </span>
                      </label>

                      {onOpenModalites && (
                        <div className="text-right">
                          <button
                            type="button"
                            onClick={onOpenModalites}
                            className="text-[11px] text-sky-400 hover:text-sky-300 underline font-medium cursor-pointer"
                          >
                            Consulter les Modalités Complètes d'Inscription & Charte RDC →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
                    >
                      Retour
                    </button>
                    <button
                      type="submit"
                      disabled={!acceptTerms || isSubmitting}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-950 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Création en cours...</span>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Valider mon Inscription</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
