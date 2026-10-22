import React from 'react';
import { Formateur } from '../../types/formateur';
import { FormateurVehicleLogos } from '../common/VehicleBadges';
import { X, Mail, Phone, Calendar, ShieldCheck, CheckCircle2, AlertCircle, FileCode } from 'lucide-react';

interface Props {
  formateur: Formateur;
  onClose: () => void;
  onEdit?: () => void;
  canEdit?: boolean;
}

export const FormateurDetailModal: React.FC<Props> = ({ formateur, onClose, onEdit, canEdit }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header in TPG orange */}
        <div className="bg-[#FD5312] p-5 text-white flex justify-between items-start">
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-orange-200 mb-1">
              Fiche Individuelle Formateur
            </div>
            <h2 className="text-xl font-black uppercase font-sans tracking-tight">
              {formateur.nomComplet}
            </h2>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <FormateurVehicleLogos
                hasTram={formateur.hasTram}
                hasAB={formateur.hasAB}
                hasTB={formateur.hasTB}
                hasCTT={formateur.hasCTT}
                isTramway={formateur.isTramway}
              />
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded font-mono font-bold">
                ID: {formateur.id}
              </span>
              {formateur.acronyme ? (
                <span className="text-xs bg-black/20 px-2 py-0.5 rounded font-mono font-bold">
                  Acronyme: {formateur.acronyme}
                </span>
              ) : null}
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-5">
          {/* Qualifications & Habilitations Métier */}
          <div>
            <div className="text-xs font-black uppercase text-gray-500 tracking-wider mb-2">
              Qualifications & Habilitations Métier
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {/* Tramway */}
              <div
                className={`p-3 rounded-xl border flex items-center gap-2.5 ${
                  (formateur.hasTram ?? formateur.isTramway)
                    ? 'bg-orange-50 border-orange-200 text-[#FD5312]'
                    : 'bg-gray-50 border-gray-200 text-gray-400'
                }`}
              >
                {(formateur.hasTram ?? formateur.isTramway) ? (
                  <CheckCircle2 className="w-5 h-5 text-[#FD5312] shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-gray-300 shrink-0" />
                )}
                <div>
                  <div className="text-xs font-black uppercase flex items-center gap-1">
                    <span>Tram</span>
                  </div>
                  <div className="text-[11px] font-semibold opacity-90">
                    {(formateur.hasTram ?? formateur.isTramway) ? 'Habilité Tram' : 'Non habilité'}
                  </div>
                </div>
              </div>

              {/* Autobus (AB) */}
              <div
                className={`p-3 rounded-xl border flex items-center gap-2.5 ${
                  (formateur.hasAB ?? true)
                    ? 'bg-sky-50 border-sky-200 text-[#008CBE]'
                    : 'bg-gray-50 border-gray-200 text-gray-400'
                }`}
              >
                {(formateur.hasAB ?? true) ? (
                  <CheckCircle2 className="w-5 h-5 text-[#008CBE] shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-gray-300 shrink-0" />
                )}
                <div>
                  <div className="text-xs font-black uppercase">Autobus</div>
                  <div className="text-[11px] font-semibold opacity-90">
                    {(formateur.hasAB ?? true) ? 'Habilité AB' : 'Non habilité'}
                  </div>
                </div>
              </div>

              {/* Trolleybus (TB) */}
              <div
                className={`p-3 rounded-xl border flex items-center gap-2.5 ${
                  (formateur.hasTB ?? true)
                    ? 'bg-emerald-50 border-emerald-200 text-[#059669]'
                    : 'bg-gray-50 border-gray-200 text-gray-400'
                }`}
              >
                {(formateur.hasTB ?? true) ? (
                  <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-gray-300 shrink-0" />
                )}
                <div>
                  <div className="text-xs font-black uppercase">Trolleybus</div>
                  <div className="text-[11px] font-semibold opacity-90">
                    {(formateur.hasTB ?? true) ? 'Habilité TB' : 'Non habilité'}
                  </div>
                </div>
              </div>

              {/* CTT */}
              <div
                className={`p-3 rounded-xl border flex items-center gap-2.5 ${
                  formateur.hasCTT
                    ? 'bg-purple-50 border-purple-200 text-[#6D28D9]'
                    : 'bg-gray-50 border-gray-200 text-gray-400'
                }`}
              >
                {formateur.hasCTT ? (
                  <CheckCircle2 className="w-5 h-5 text-[#6D28D9] shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-gray-300 shrink-0" />
                )}
                <div>
                  <div className="text-xs font-black uppercase">CTT</div>
                  <div className="text-[11px] font-semibold opacity-90">
                    {formateur.hasCTT ? 'Habilité CTT' : 'Non habilité'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <div className="text-xs font-black uppercase text-gray-500 tracking-wider mb-2">
              Coordonnées professionnelles
            </div>
            <div className="space-y-2 text-sm bg-gray-50 p-3.5 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="font-semibold">{formateur.email || 'Email non renseigné'}</span>
                {formateur.email && (
                  <a
                    href={`mailto:${formateur.email}`}
                    className="ml-auto text-xs font-black text-[#FD5312] hover:underline"
                  >
                    Écrire
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                <span>{formateur.mobile || formateur.telephone || 'Portable non renseigné'}</span>
                {(formateur.mobile || formateur.telephone) && (
                  <a
                    href={`tel:${(formateur.mobile || formateur.telephone || '').replace(/\s+/g, '')}`}
                    className="ml-auto text-xs font-black text-[#FD5312] hover:underline"
                  >
                    Appeler
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-xs text-gray-500">
                  Enregistré dans le portail : {formateur.dateAjout || 'Initialisation système'}
                </span>
              </div>
            </div>
          </div>

          {/* Provenance source badge */}
          <div>
            <div className="text-xs font-black uppercase text-gray-500 tracking-wider mb-1.5">
              Provenance des données source
            </div>
            <div className="p-3 bg-gray-100 rounded-lg text-xs text-gray-700 flex items-start gap-2 border border-gray-200">
              <FileCode className="w-4 h-4 text-[#FD5312] shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-gray-900">
                  {formateur.sourceOrigin === 'source_html_v18'
                    ? 'Portail HTML TPG v18 (Source de vérité principale)'
                    : formateur.sourceOrigin === 'source_pdf_v7'
                    ? 'Liste des formateurs PDF v7 (Document annexe)'
                    : 'Création manuelle certifiée'}
                </span>
                <p className="mt-0.5 text-gray-500 text-[11px]">
                  {formateur.sourceOrigin === 'source_html_v18' &&
                    'Orthographe et patronyme importés avec stricte fidélité à l’identique.'}
                  {formateur.sourceOrigin === 'source_pdf_v7' &&
                    'Identifié dans le PDF v7 et réconcilié dans le référentiel opérationnel.'}
                </p>
              </div>
            </div>
          </div>

          {formateur.notes && (
            <div>
              <div className="text-xs font-black uppercase text-gray-500 tracking-wider mb-1">
                Remarques & Observations
              </div>
              <p className="text-xs text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200 whitespace-pre-wrap">
                {formateur.notes}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 font-bold text-xs uppercase rounded-lg transition cursor-pointer"
          >
            Fermer
          </button>

          {canEdit && onEdit && (
            <button
              onClick={() => {
                onClose();
                onEdit();
              }}
              className="px-4 py-2 bg-[#FD5312] hover:bg-[#e04508] text-white font-black text-xs uppercase rounded-lg shadow-sm transition cursor-pointer"
            >
              Modifier la fiche
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
