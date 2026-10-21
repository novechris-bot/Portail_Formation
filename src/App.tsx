import React, { useState, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginModal } from './components/auth/LoginModal';
import { Header } from './components/layout/Header';
import { OfflineIndicator } from './components/layout/OfflineIndicator';
import { Module1Cours } from './components/modules/Module1Cours';
import { Module2Rails } from './components/modules/Module2Rails';
import { Module3Tram } from './components/modules/Module3Tram';
import { Module4Abtb } from './components/modules/Module4Abtb';
import { Module5Vehicule } from './components/modules/Module5Vehicule';
import { Module6Avarie } from './components/modules/Module6Avarie';
import { Module7Horaire } from './components/modules/Module7Horaire';
import { FormateursDirectory } from './components/formateurs/FormateursDirectory';
import { Formateur } from './types/formateur';
import { AppConfig } from './types/modules';
import { api } from './services/api';
import { ShieldCheck, Info } from 'lucide-react';

const MainApp: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('cours');
  const [formateurs, setFormateurs] = useState<Formateur[]>([]);
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [dataLoading, setDataLoading] = useState(false);

  const loadData = useCallback(async () => {
    if (!isAuthenticated) return;
    setDataLoading(true);
    try {
      const [formData, cfgData] = await Promise.all([
        api.formateurs.getAll(),
        api.config.get()
      ]);
      setFormateurs(formData.formateurs);
      setConfig(cfgData);
    } catch (err) {
      console.error('Error loading initial portal data:', err);
    } finally {
      setDataLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, loadData]);

  const handleCreateFormateur = async (data: Partial<Formateur>) => {
    await api.formateurs.create(data);
    await loadData();
  };

  const handleUpdateFormateur = async (id: string, data: Partial<Formateur>) => {
    await api.formateurs.update(id, data);
    await loadData();
  };

  const handleDeleteFormateur = async (id: string) => {
    await api.formateurs.delete(id);
    await loadData();
  };

  const handleResetDefaults = async () => {
    await api.formateurs.resetDefault();
    await loadData();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f0f0]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#FD5312] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-black uppercase text-gray-600 tracking-wider">
            Chargement sécurisé du Portail TPG...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginModal />;
  }

  const mailConfig = config?.MAIL_CONFIG || {
    cours_rct: 'GTR-Planification@tpg.ch',
    cours_600: 'Dias.Celso@tpg.ch',
    rails_to: 'vondach.baptiste@tpg.ch,Resp.equipesCMB2@tpg.ch',
    rails_cc: 'batiments@tpg.ch',
    tram_bachet: 'Resp.equipesCMB2@tpg.ch,Equipes_Planification_CMB@tpg.ch,cadres.operationnels@tpg.ch',
    tram_chardon: 'Resp.equipesCMB2@tpg.ch,Equipes_Planification_CMB@tpg.ch,Linares.David@tpg.ch',
    abtb_bachet: 'Resp.equipesCMB2@tpg.ch,Equipes_Planification_CMB@tpg.ch,cadres.operationnels@tpg.ch',
    abtb_chardon: 'Resp.equipesCMB2@tpg.ch,Equipes_Planification_CMB@tpg.ch,cadres.operationnels@tpg.ch',
    abtb_jonctionab: 'Resp.equipesCMJ2@tpg.ch,Equipes_Planification_CMJ@tpg.ch,cadres.operationnels@tpg.ch',
    abtb_jonctiontb: 'Resp.equipesCMJ2@tpg.ch,Equipes_Planification_CMJ@tpg.ch,cadres.operationnels@tpg.ch',
    vehicule_leger: 'ducret.julien@tpg.ch',
    vehicule_abtb: 'convers.alain@tpg.ch',
    avarie_bachet: 'Resp.equipesCMB2@tpg.ch,Equipes_Planification_CMB@tpg.ch',
    avarie_chardon: 'Resp.equipesCMC@tpg.ch,Equipes_Planification_CMC@tpg.ch',
    avarie_jonctab: 'Resp.equipesCMJ2@tpg.ch,Equipes_Planification_CMJ@tpg.ch',
    avarie_joncttb: 'Resp.equipesCMJ2@tpg.ch,Equipes_Planification_CMJ@tpg.ch',
    horaire_to: 'bex@tpg.ch'
  };

  const vtbOptions = config?.vtbOptions || [];

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#111827] flex flex-col font-sans">
      <div className="container mx-auto max-w-[1100px] p-2 sm:p-4 flex-1 flex flex-col">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-visible flex-1 flex flex-col">
          {/* Header Component */}
          <Header
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            formateursCount={formateurs.length}
          />

          {/* Module Content Switcher */}
          <main className="flex-1">
            {dataLoading && formateurs.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-8 h-8 border-3 border-[#FD5312] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <span className="text-xs font-bold text-gray-500 uppercase">
                  Chargement des modules...
                </span>
              </div>
            ) : (
              <>
                {activeTab === 'cours' && (
                  <Module1Cours formateurs={formateurs} mailConfig={mailConfig} />
                )}
                {activeTab === 'rails' && (
                  <Module2Rails formateurs={formateurs} mailConfig={mailConfig} />
                )}
                {activeTab === 'tram' && (
                  <Module3Tram formateurs={formateurs} mailConfig={mailConfig} />
                )}
                {activeTab === 'abtb' && (
                  <Module4Abtb formateurs={formateurs} mailConfig={mailConfig} />
                )}
                {activeTab === 'vehicule' && (
                  <Module5Vehicule
                    formateurs={formateurs}
                    mailConfig={mailConfig}
                    vtbOptions={vtbOptions}
                  />
                )}
                {activeTab === 'avarie' && (
                  <Module6Avarie formateurs={formateurs} mailConfig={mailConfig} />
                )}
                {activeTab === 'horaire' && (
                  <Module7Horaire formateurs={formateurs} mailConfig={mailConfig} />
                )}
                {activeTab === 'formateurs' && (
                  <FormateursDirectory
                    formateurs={formateurs}
                    onRefresh={loadData}
                    onCreate={handleCreateFormateur}
                    onUpdate={handleUpdateFormateur}
                    onDelete={handleDeleteFormateur}
                    onResetDefaults={handleResetDefaults}
                  />
                )}
              </>
            )}
          </main>

          {/* Discreet Footer */}
          <footer className="p-3 bg-gray-50 border-t border-gray-200 text-center text-xs text-gray-500 flex flex-wrap items-center justify-between gap-2 no-print">
            <div className="flex items-center gap-1.5 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Transports Publics Genevois • Portail Formation Sécurisé PWA</span>
            </div>
            <div className="text-[11px] text-gray-400">
              Session active • {user?.username} ({user?.role})
            </div>
          </footer>
        </div>
      </div>

      {/* Offline Indicator Toast */}
      <OfflineIndicator />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
