import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Patient, Caretaker, Medication, medications, patients as initialPatients, caretakers as initialCaretakers } from '@/app/data/mockData';

interface PatientContextType {
    patients: Patient[];
    caretakers: Caretaker[];
    addPatient: (caretakerId: string | null, patientData: Omit<Patient, 'id' | 'medications' | 'logs' | 'adherenceScore' | 'lastCheckIn' | 'missedMedsCount'> & { id?: string }) => void;
    addCaretaker: (caretakerId: string, caretakerData: { name: string; email: string; role?: string; phone?: string; avatar?: string }) => void;
    addMedication: (patientId: string, medication: Omit<Medication, 'id'>) => void;
    updatePatient: (patientId: string, updates: Partial<Patient>) => void;
    updateCaretaker: (caretakerId: string, updates: Partial<Caretaker>) => void;
    deletePatient: (patientId: string, caretakerId: string) => void;
    getPatientsByCaretaker: (caretakerId: string) => Patient[];
    linkPatientToCaretaker: (patientId: string, caretakerId: string) => { success: boolean; message?: string };
    addLog: (patientId: string, logData: {
        medicationId: string;
        medicationName: string;
        status: 'taken' | 'missed' | 'pending' | 'verified';
        scheduledTime: string;
        actualTime?: string;
        verificationMethod?: 'scan' | 'manual' | 'voice';
        date: string;
    }) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export function PatientProvider({ children }: { children: ReactNode }) {
    // Initialize state from localStorage or fallback to mock data
    const [patients, setPatients] = useState<Patient[]>(() => {
        try {
            const saved = localStorage.getItem('patients');
            const parsed = saved ? JSON.parse(saved) : [];

            // Merge initial patients with saved patients, ensuring it's an array
            const merged = Array.isArray(parsed) ? [...parsed] : [];
            initialPatients.forEach((initPatient: Patient) => {
                const existingIndex = merged.findIndex((p: Patient) => p.id === initPatient.id);
                if (existingIndex === -1) {
                    merged.push(initPatient);
                } else {
                    // Force Demo Medicine to be present for existing patients
                    // And ensure they have at least some medications if they were empty
                    if (merged[existingIndex].medications.length === 0) {
                        merged[existingIndex].medications = [...initPatient.medications];
                    } else {
                        initPatient.medications.forEach((med: Medication) => {
                            const medIndex = merged[existingIndex].medications.findIndex((m: Medication) => m.id === med.id);
                            if (medIndex === -1) {
                                merged[existingIndex].medications.push(med);
                            } else {
                                // Update existing demo medication with latest mock data (times, names etc)
                                merged[existingIndex].medications[medIndex] = { ...med };
                            }
                        });
                    }
                }
            });

            // Ensure EVERY patient (even those created via signup like "amit") has medications
            merged.forEach((p: Patient) => {
                if (!p.medications || p.medications.length === 0) {
                    p.medications = [...medications];
                }
            });

            return merged;
        } catch (e) {
            console.error('Failed to load patients from localStorage', e);
            return initialPatients;
        }
    });

    const [caretakers, setCaretakers] = useState<Caretaker[]>(() => {
        try {
            const saved = localStorage.getItem('caretakers');
            const parsed = saved ? JSON.parse(saved) : [];

            // Merge initial caretakers with saved caretakers, ensuring it's an array
            const merged = Array.isArray(parsed) ? [...parsed] : [];
            initialCaretakers.forEach((initCaretaker: Caretaker) => {
                if (!merged.some((c: Caretaker) => c.id === initCaretaker.id)) {
                    merged.push(initCaretaker);
                }
            });
            return merged;
        } catch (e) {
            console.error('Failed to load caretakers from localStorage', e);
            return initialCaretakers;
        }
    });

    // Save to localStorage whenever patients change
    useEffect(() => {
        try {
            localStorage.setItem('patients', JSON.stringify(patients));
        } catch (e) {
            console.error('Failed to save patients to localStorage', e);
        }
    }, [patients]);

    // Save to localStorage whenever caretakers change
    useEffect(() => {
        try {
            localStorage.setItem('caretakers', JSON.stringify(caretakers));
        } catch (e) {
            console.error('Failed to save caretakers to localStorage', e);
        }
    }, [caretakers]);

    const addPatient = (
        caretakerId: string | null,
        patientData: Omit<Patient, 'id' | 'medications' | 'logs' | 'adherenceScore' | 'lastCheckIn' | 'missedMedsCount'>
    ) => {
        const newPatient: Patient = {
            id: patientData.id || `p${Date.now()}`, // Allow passing ID if available
            ...patientData,
            medications: [...medications], // Initialize with demo medications
            logs: [],
            adherenceScore: 100,
            lastCheckIn: new Date().toISOString(),
            missedMedsCount: 0
        };

        setPatients(prev => {
            // Check if patient already exists to avoid duplicates
            if (prev.some(p => p.id === newPatient.id)) return prev;
            return [...prev, newPatient];
        });

        // Update caretaker's patient list if caretakerId is provided
        if (caretakerId) {
            setCaretakers(prev =>
                prev.map(c =>
                    c.id === caretakerId
                        ? { ...c, patientIds: [...c.patientIds, newPatient.id] }
                        : c
                )
            );
        }
    };

    const addCaretaker = (
        caretakerId: string,
        caretakerData: { name: string; email: string; role?: string; phone?: string; avatar?: string }
    ) => {
        // Check if caretaker already exists
        const existingCaretaker = caretakers.find(c => c.id === caretakerId);
        if (existingCaretaker) {
            console.log('Caretaker already exists:', caretakerId);
            return;
        }

        const newCaretaker: Caretaker = {
            id: caretakerId,
            name: caretakerData.name,
            email: caretakerData.email,
            role: caretakerData.role || 'Caretaker',
            phone: caretakerData.phone || '',
            avatar: caretakerData.avatar || '👤',
            patientIds: []
        };

        setCaretakers(prev => [...prev, newCaretaker]);
        console.log('Created new caretaker:', newCaretaker);
    };

    const addMedication = (
        patientId: string,
        medicationData: Omit<Medication, 'id'>
    ) => {
        const newMedication: Medication = {
            id: `med-${Date.now()}`,
            ...medicationData
        };

        setPatients(prev =>
            prev.map(p =>
                p.id === patientId
                    ? { ...p, medications: [...p.medications, newMedication] }
                    : p
            )
        );
    };


    const updatePatient = (patientId: string, updates: Partial<Patient>) => {
        setPatients(prev =>
            prev.map(p => (p.id === patientId ? { ...p, ...updates } : p))
        );
    };

    const updateCaretaker = (caretakerId: string, updates: Partial<Caretaker>) => {
        setCaretakers(prev =>
            prev.map(c => (c.id === caretakerId ? { ...c, ...updates } : c))
        );
    };

    const deletePatient = (patientId: string, caretakerId: string) => {
        // Remove from master patient list
        setPatients(prev => prev.filter(p => p.id !== patientId));

        // Remove from caretaker's patient list
        setCaretakers(prev =>
            prev.map(c =>
                c.id === caretakerId
                    ? { ...c, patientIds: c.patientIds.filter(id => id !== patientId) }
                    : c
            )
        );
    };

    const getPatientsByCaretaker = (caretakerId: string) => {
        const caretaker = caretakers.find(c => c.id === caretakerId);
        if (!caretaker) return [];
        return patients.filter(p => caretaker.patientIds.includes(p.id));
    };

    const linkPatientToCaretaker = (patientId: string, caretakerId: string) => {
        const caretaker = caretakers.find(c => c.id === caretakerId);
        if (!caretaker) {
            return { success: false, message: 'Caretaker ID not found' };
        }

        if (caretaker.patientIds.includes(patientId)) {
            return { success: false, message: 'Already linked to this caretaker' };
        }

        setCaretakers(prev =>
            prev.map(c =>
                c.id === caretakerId
                    ? { ...c, patientIds: [...c.patientIds, patientId] }
                    : c
            )
        );
        return { success: true };
    };

    const addLog = (
        patientId: string,
        logData: {
            medicationId: string;
            medicationName: string;
            status: 'taken' | 'missed' | 'pending' | 'verified';
            scheduledTime: string;
            actualTime?: string;
            verificationMethod?: 'scan' | 'manual' | 'voice';
            date: string;
        }
    ) => {
        setPatients(prev =>
            prev.map(p => {
                if (p.id !== patientId) return p;

                const newLogs = [
                    ...p.logs,
                    {
                        id: `log-${Date.now()}`,
                        ...logData
                    }
                ];

                // Calculate Adherence Score
                // This is a simplified calculation: (Taken / Total Logs) * 100
                const takenCount = newLogs.filter(l => l.status === 'taken' || l.status === 'verified').length;
                const totalCount = newLogs.length; // In a real app, this would be total *scheduled* up to now
                const newScore = totalCount > 0 ? Math.round((takenCount / totalCount) * 100) : 100;

                return {
                    ...p,
                    logs: newLogs,
                    adherenceScore: newScore,
                    lastCheckIn: new Date().toISOString()
                };
            })
        );
    };

    return (
        <PatientContext.Provider
            value={{
                patients,
                caretakers,
                addPatient,
                addCaretaker,
                addMedication,
                updatePatient,
                updateCaretaker,
                deletePatient,
                getPatientsByCaretaker,
                linkPatientToCaretaker,
                addLog
            }}
        >
            {children}
        </PatientContext.Provider>
    );
}

export function usePatientContext() {
    const context = useContext(PatientContext);
    if (!context) {
        throw new Error('usePatientContext must be used within PatientProvider');
    }
    return context;
}
