const fr = {
    countable: {
        1: "premier",
        2: "deuxième",
        3: "troisième",
        4: "quatrième",
        5: "cinquième",
        6: "sixième",
        7: "septième",
        8: "huitième",
        9: "neuvième",
        10: "dixième",
    },
    serverErrorTitle: "Actuellement le serveur est surchargé !",
    serverErrorText: "Veuillez essayer de nouveau plus tard .",

    login: "Se connecter",
    logout: "Déconnexion",
    upload: "Envoyer",
    documentUploadHint:
        "Vous avez déjà envoyé un document - l'envoi d'une nouvelle PJ écrasera la précédente",
    username: "Utilisateur",
    password: "Mot de passe",
    resetPasswordEmail: "Saisissez votre adresse e-mail",
    forgottenPassword: "Mot de passe oublié ?",

    validate: "Valider",
    wrongLoginTitle: "Utilisateur ou mot de passe erroné",
    wrongLoginText:
        "Le nom utilisateur, le mot de passe ou les deux sont erronés. Essayez de nouveau ou bien contactez votre administrateur.",

    historyNotAvailableTitle:
        "L’historique pour cette configuration n’est pas disponible.",
    historyNotAvailableText:
        "L’historique de la configuration sélectionnée n’est plus disponible pour consultation. Contactez votre service technique pour plus d’information.",

    new: "new",
    yes: "Oui",
    no: "Non",
    selectAll: "Sélectionner tout",
    selectedText: "sélectionnés",
    expiredSession: "Votre session a expiré. Veuillez vous reconnecter",
    confirm: "Confirmer",
    cancel: "Annuler",
    close: "Annuler",
    active: "Active",
    inactive: "Inactive",
    edit: "Modifier",
    createNew: "Créer un nouveau",
    required: "Le champ est obligatoire",
    maxFileSize: "Votre document ne doit pas dépasser 3MB",
    all: "Tout",
    maxCommentSize: "Merci de limiter votre commentaire à 200 caractères",

    home: "Acceuil",
    configuration: "Configuration",
    backOffice: "Contrôle manuel",
    libraries: "Catalogues",
    document: "Catalogue des pièces justificatives",
    psLists: "Catalogue Listes de PSs",
    statistics: "Statistiques",
    operationalManagement: "Pilotage Opérationnel",
    clientManagement: "Indicateurs clients",
    users: "Utilisateurs",
    resultsPerPage: "Résultats par page",
    noResults: "Aucun résultat trouvé",

    deleteMessage: "Etes-vous sûr de vouloir supprimer cet élément ?",
    deactivateMessage: "Etes-vous sûr de vouloir supprimer cet élément ?",

    breadcrumbs: {
        login: "Login",
        configControlContexts: "Configuration du Processus de contrôle",
        configuration: "Configuration du Produit de détection de fraude ",
        home: "Dashboard",
        dataikuFlow: "Suivi des FLUX",
        configJustificationContexts:
            "Configuration du Processus de justification",
        configControlContextsHistory:
            "Historique : Configuration du Processus de contrôle ",
        configJustificationContextsHistory:
            "Historique : Configuration du Processus de justification ",
        configOMIndicators: "Configuration du Pilotage Opérationnel",
        configCMIndicators: "Configuration des Indicateurs Clients",
        document: "Catalogue des pièces justificatives",
        psList: "Catalogue Listes de PSs",
        dossierJustification: "Dossier",
        gestionnaireDocumentUpload: "Upload documents",
        resultPage: "Result page",
        pwdupdate: "update password",
        documentUpload: "Upload documents",
        statistics: "Liste des statistiques",
        operationalManagement: "Pilotage Opérationnel",
        operationalManagementIndicator: {
            SLA: "SLA",
            dossiersProductivity: "Productivité - Dossiers",
            tempsProductivity: "Productivité - Temps",
            incompleteDossiers: "Dossiers non complets",
        },
        clientManagement: "Indicateurs clients",
        clientManagementIndicator: {
            gains: "Gains",
            onHold: "PEC mises en attente",
            deleted: "PEC supprimées",
        },
        stoppedVsCancelledGain:
            "Dossiers mis en attente contre annulés par client, en €",
        stoppedVsCancelledInNumber: "Mis en attente contre annulés",
        notControlledByTeam: "Dossiers non contrôlés en nombre et en montant",
        controlledByPeriod: "Dossiers contrôlés par client",
        averageTimeToProcessDossier:
            "Temps moyen de traitement d'un dossier en nombre de jours",
        cancelledPerUserPerMonth: "Dossiers annulés par gestionnaire, en €",
        chooseMcTask: "Contrôle manuel",
        downloadFile: "Download",
        userManagement: "Gestion des utilisateurs",
        editEntity: "Edit entity",
        omc: "Catalogue OMC(s)",
        network: "Catalogue réseaux",
        motiveSet: "Catalogue Motifs",
    },

    noRecordsFount: "Aucun résultat trouvé",

    defineJustifications: "Define Justifications",
    deactivationMessage:
        "Confirmez-vous votre choix de vouloir désactiver cette configuration ?",

    CONTROL_100_PERCENT: "100% records",
    CONTROL_RANDOM: "Random Control",
    CONTROL_PS_BLACKLIST: "Black List",
    sendMail: "Envoi e-mail",
    sendMailDocument: "Envoi e-mail et lien téléchargement",

    LIMIT_STEP: "Step",
    LIMIT_DAILY: "Limite par jour",
    pjs: {
        title: "Pièces justificatives",
        pjLabel: "Libellé de la pièce justificative",
        motivesSectionLabel: "Définir les motifs de rejet",
        motivesArchviedSectionLabel: "Rétablir les motifs de rejet",
        motiveLabel: "Libellé du motif de rejet sur IHM",
        referenceLabel: "Libellé de référence",
        documentLabel: "Motif dans le courrier PS",
        regulationLabel: "Libellé légal",
        update: "Modifier",
        save: "Enregistrer",
        restore: "Rétablir",
        createNewPJ: "Créer nouvelle pièce justificative",
        configuredDocuments: "Pièces justificatives configurées ",
        archivedDocuments: "Motifs de rejet archivés ",
        newMotive: "Motif de rejet",
        processWithoutPJ: "Process sans pièce justificative",
        inUseMessage:
            "Suppression impossible. La pièce justificative que vous voulez supprimer est utilisée dans une configuration de processus de justification existante.",
        deleteMessage: "Etes-vous sûr de vouloir supprimer cet élément ?",
        motiveImpossibleDeleteMessage:
            "Suppression impossible. Au moins un motif doit être enregistré",
        confirm: "Confirmer",
        cancel: "Annuler",
    },

    psList: {
        title: "Listes des PS(s)",
        newTitle: "Créer nouvelle liste de PS(s)",
        listsTitle: "Listes de PS(s) configurées",
        listLabel: "Libellé de la liste des PS(s)",
        newListValue: "Liste des PS(s)",
        oldListValue: "Identifiants PS(s)",
        save: "Enregistrer",
        modify: "Modifier",

        inUseMessage:
            "Suppression impossible. La liste de PS que vous voulez supprimer est utilisée dans une configuration de processus de justification existante.",
        deleteMessage: "Etes-vous sûr de vouloir supprimer cet élément ?",
        confirm: "Confirmer",
        cancel: "Annuler",
    },

    configurationHome: {
        title: "Configuration Produit détection de fraude",
        controlsTitle: "Processus de contrôle",
        justificationsTitle: "Processus de justification",
        create: "Créer",
        summery: {
            omcs: "OMC(s)",
            disciplines: "Discipline(s)",
            networks: "Réseau(x)",
            psLists: "PS(s)",
            rules: "Règles et ordre",
            creationDate: "Créé le",
            createdBy: "Créé par",
            steps: "Libellé étape",
            periods: "Période",
            actions: "Action",
        },
        tooltips: {
            edit: "Modifier",
            deactivate: "Désactiver",
            duplicate: "Dupliquer",
            history: "Historique",
        },
    },

    controlContext: {
        title: "Configuration Processus de contrôle",
        controlContextName: "Libellé processus de contrôle",
        startDate: "Date début validité",
        endDate: "Date fin validité",
        continue: "Continuer",
        configure: "Enregistrer",
        validationEndBeforeStartDate:
            "La date de fin validité ne peut pas être antérieure à la date début validité ou à la date de création de la configuration du processus. Vérifiez votre saisie et saisissez un date correcte.",
        steps: {
            defineContext: "Définir contexte",
            defineControls: "Configurer les contrôles",
        },
    },

    defineContext: {
        title: "Définir le contexte du contrôle",
        omcs: "OMC(s)",
        disciplines: "Discipline(s)",
        networks: "Réseau(x)",
        psLists: "PS(s)",
        selectAll: "Sélectionner tout",
    },

    justificationContext: {
        title: "Configuration du Processus de justification",
        justificationContextName: "Libellé Processus de justification",
        startDate: "Date début validité",
        endDate: "Date fin validité",
        continue: "Continuer",
        configure: "Enregistrer",
        validationEndBeforeStartDate:
            "La date de fin validité ne peut pas être antérieure à la date début validité ou à la date de création de la configuration du processus. Vérifiez votre saisie et saisissez un date correcte.",
        steps: {
            defineContext: "Définir Contexte",
            definePJs: "Sélectionner PJs",
            defineStepsAndActions: "Définir étapes et actions",
            configureActions: "Configurer actions",
            configureEvents: "Configurer évènement manuel",
        },
        pjStep: {
            title: "Sélectionner pièce(s) justificative(s)",
            motivesTitle: "Motifs configurés pour cette pièce justificative",
            requireAllPJAtOnce:
                "Réclamer toutes les pièce(s) justificative(s) à la fois",
            requiredPJ: "PJ requise",
            multiUpload: "Multi-upload",
        },
        followUpsStep: {
            newInitialStep: "Etape initiale",
            additionalStep: "Etape complémentaire",
            stepLabel: "Libellé de l'étape",
            periodLabel: "Periode",
            actionsLabel: "Définir action pour cette étape",
            periodPrependedLabel: "J+",
            addStepsLabel: "Sélectionner les étapes à inclure",
            initialStep: "Etape initiale",
            nextStep: "Ajouter une étape",
            stepsIncluded: "ajoutée",
            nothingToConfigure: "Aucune action à configurer",
            tooltips: {
                label: "Permet de saisir un libellé pour l’étape.",
                period: "Permet de saisir le nombre de jours de la période en comptant du jour initial de mise en attente du dossier (J).",
                actions:
                    "Permet de sélectionner un action pour l’étape en cours de définition.",
            },
        },
        actionLabels: {
            SEND_MAIL: "Envoi e-mail",
            SEND_MAIL_UPLOAD_DOCUMENT: "Envoi e-mail et lien téléchargement",
            CANCEL_DOSSIER: "Annuler le dossier",
        },
        actionsStep: {
            emailTitle: "Envoyer e-mail",
            from: "De :",
            to: "A :",
            cc: "Cc :",
            subject: "Sujet :",
            attachment: "Pièce(s) jointe(s):",
            attachmentName: "Libellé pièce jointe",
            placeholders: "Placeholders à utiliser :",
        },
        configureEvents: {
            chooseAction: "Définir une action pour cette étape",
        },
    },

    //Ps lists userManagement
    createNewList: "Créer une nouvelle liste de PSs",
    psListTitleLabel: "Libellé des PSs",
    psListLabel: "Liste de PS(s)",
    controlHistory: {
        pageTitle: "Historique : ",
        mainTitle: "Configuration de Processus de contrôle ",
        contextTitle: "Contexte",
        controlsTitle: "Contrôles",

        psList: "Liste des PS(s)",

        omcs: "OMC(s)",
        disciplines: "Discipline(s)",
        networks: "Réseau(x)",
        pss: "PS(s)",
    },
    documentUpload: {
        title: "Téléchargement de vos pièces justificatives",
        expiredTitle:
            "La date limite de dépôt de vos pièces justificatives est expirée.",
        label: () =>
            "Afin que le dossier soit pris en charge, merci de procéder à un téléchargement de chaque document séparément sous format PDF ou image. Vos documents ne doivent pas dépasser 3MB.",
        dialogText: "",
        dialogTitle:
            "Etes-vous sûr de vouloir télécharger les pièces justificatives?",
        dialogConfirm: "Confirmer",
        dialogCancel: "Annuler",
        wrongFileType: "Votre fichier doit être au format PDF ou image.",
        tooManyFiles: "Veuillez télécharger 4 documents au maximum.",
        placeholder: "Téléchargez votre document",
        placeholderMultiUpload: "Téléchargez jusqu'à 4 documents au maximum",
        documentUploadResult: {
            allDocuments: {
                title: "Vous avez téléchargé tous les documents nécessaires avec succès",
                text: () =>
                    "Ce lien de téléchargement ne sera plus disponible. Nous allons revenir vers vous dans les plus brefs délais avec de l'information sur l'évaluation de votre dossier.",
            },
            documents: {
                title: "Vos fichiers ont été téléchargés avec succès",
                text: (endDate) =>
                    `Merci de nous envoyer l’intégralité de vos pièces justificatives avant le ${endDate}`,
            },
        },
        comments: "Commentaires sur le dossier",
    },
    dossierJustification: {
        dossier: "Dossier #",
        buttonDocumentUpload: "Téléchargement des PJ ",
        buttonSaveClose: "Enregistrer et fermer",
        buttonSave: "Enregistrer",
        topRejectedMotives: {
            title: "Top 5 des motifs de rejet pour ce PS",
            show: "Montrer ",
            hide: "Cacher",
            empty: "Aucune raison de rejet",
        },
        deadlineMessage: {
            deadlineTitle: (endDate) =>
                `Merci de contrôler ce dossier avant le ${endDate}`,
            deadlineTitleBefore45days: (endDate) =>
                `Merci d'analyser le dossier avant la date du ${endDate}`,
            deadlineTitleAfter45days: (endDate) =>
                `Merci d'analyser ce dossier avant la date du  ${endDate}`,
            deadlineMessageAfter45days: (endDate) =>
                `Merci d'analyser ce dossier avant la date du ${endDate}, auquel cas le dossier sera apuré automatiquement.`,
            // initialRequest: endDate =>
            //     `Merci d’analyser ce dossier avant le ${endDate}. Après cette date, sans contrôle de votre part, le dossier sera automatiquement apuré.`,
            // reminderSent: (dateOfLastStep, endDate, reminder) =>
            //     `Un ${reminder} rappel a été envoyé au PS en date du ${dateOfLastStep}. Le dossier sera automatiquement apuré le ${endDate}, si à la réception des pièces justificatives le contrôle manuel n'est pas effectué.`,
            // lastReminderSent: (dateOfLastStep, endDate) =>
            //     `La dernière relance a été envoyée au PS en date du ${dateOfLastStep}. Aucune nouvelle relance manuelle ne pourrait pas être envoyée. Le dossier sera automatiquement apuré le ${endDate}, si à la réception des pièces justificatives le contrôle manuel n'est pas effectué.`
        },
        contextualMessages: {
            controlCancelledDossier: {
                title: (months) =>
                    `Un ou plusieurs dossiers annulés ont été détectés sur les ${months} derniers mois`,
                message: (months) =>
                    `Les dossiers suivants pour le même bénéficiaire ont été annulés au cours des ${months} derniers mois:\n`,
                dossier: "Dossier",
            },
            controlChangeDioptre: {
                title: "Contrôle de changement de dioptrie",
                message: "Dossiers:",
            },
            controlExecutionTitle: "Ce dossier a été topé par le contrôle :",
        },
        dialogConfirm: "Confirmer",
        dialogCancel: "Annuler",
        dossierEvaluation: {
            lastYearDossierTitle:
                "Un ou plusieurs dossiers annulés ont été détectés sur les 12 derniers mois",
            lastYearDossierText:
                "Les dossiers suivants pour le même bénéficiaire ont été annulés au cours des 12\n" +
                "derniers mois:\n",
            lastYearDossierItem: "Dossier #",
            title: "Analyse du dossier",
            evaluateDossier: "Analyser le dossier",
            requestBeneficiaryLetterLabel:
                "Mettre en attente de document du bénéficiaire :",
            requestBeneficiaryLetter: "Mettre en attente",
            validateLabel: "Accorder le dossier :",
            validate: "Accorder",
            cancelLabel: "Supprimer le dossier :",
            cancel: "Supprimer",
            removeLabel: "Annuler à la demande du PS :",
            remove: "Annuler",
            cancelMotifLabel: "Motifs d'annulation",
            cancelComment: "Prénom du PS",
            cancelDateTime: "Date et heure d'annulation effective",
            cancelDate: "Choisir la date d'annulation",
            cancelTime: "Choisir l'heure d'annulation",
            relaunchLabel: "Relancer manuellement le PS",
            relaunch: "Relancer",
            activatePSUploadLabel:
                "Activer le lien de téléchargement pour le PS",
            activatePSUpload: "Activer le lien",
            documentUploadLabel: "Télécharger des pièces justificatives",
            documentUpload: "Téléchargement",
            commentsLabel: "Commentaires :",
            psComments: "Commentaires PS :",
            commentsPlaceholder:
                "Insérer votre commentaire concernant l'évaluation du dossier.",
            activatePSuploadDialogTitle:
                "Etes-vous sûr de vouloir activer le lien de téléchargement pour le PS ?",
            uploadDialogTitle: "Attention !",
            requestBeneficiaryLetterDialogTitle:
                "Etes-vous sûr de vouloir mettre en attente d'attestation du bénéficiaire ?",
            validateDialogTitle:
                "Etes-vous sûr de vouloir accorder le dossier ?",
            impossibleValidateDialogTitle: "Action impossible",
            impossibleValidateDialogText:
                "Il n'est pas possible d'accorder ce dossier. En effet, une ou plusieurs PJ sont manquantes ou non conformes",
            rejectDialogTitle:
                "Etes-vous sûr de vouloir supprimer le dossier ?",
            cancelDialogTitle:
                "Etes-vous sûr de vouloir annuler le dossier sur demande PS ?",
            relaunchDialogTitle:
                "Etes-vous sûr de vouloir envoyer une relance manuelle ?",
            uploadDialogText:
                "Les pièces téléchargées vont être remplacer par celles qui existent sur le dossier. \n Etes-vous sûr de vouloir télécharger de nouvelles pièces au dossier? \n",
            dialogText: "Etes-vous sûr de vouloir continuer ?",
            confirmActivatePSuploadText:
                "Le lien de téléchargement a été activé pour le PS en vue de téléchargement des pièces manquantes ou non valides.",
            actionNotAllowedDialogTitle: "Action impossible",
            motiveMissing:
                "Veuillez sélectionner au moins un motif de non conformité",
            actionNotAllowedDialogText:
                "La dernière relance a déjà été envoyée.",
            actionDossierCompletedText: (number) =>
                `Le dossier numéro ${number} a bien été supprimé.`,
            confirmCancelledByPSTitle: "Le dossier a été annulé avec succès! ",
            confirmCancelledByPS:
                "Ce dossier a été annulé suite à la demande du professionel de santé. ",
            showDossierDetails: "Détail de dossier",
            hideDossierDetails: "Fermer",
            historique: "Historique",
        },
        dossierSummary: {
            title: "Détail de dossier",
            yes: "OUI",
            no: "NON",
            yesSmall: "Oui",
            noSmall: "Non",
            psFolderAndInsured: {
                title: "PS et Assuré",
                beneficiary: {
                    title: "Bénéficiaire",
                    socialSecrityNumber: "N° de Sécurité Sociale",
                    age: "Âge du bénéficiaire",
                    surname: "Nom",
                    name: "Prénom",
                    birthDate: "Date de naissance",
                    deaf: "Le patient est-il atteint de cécité ?",
                    lessThen21:
                        "Le bénéficiaire est-il âgé de moins de 21 ans ?",
                    membershipNumber: "N° Adhérent",
                    mutual: "Mutuelle",
                    regime: "Régime",
                    email: "Email",
                    phone: "Téléphone",
                },
                prescriber: {
                    title: "Prescripteur",
                    surname: "Nom",
                    name: "Prénom",
                    adeliNumber: "Numéro ADELI prescripteur",
                    psRpps: "Numéro RPPS prescripteur",
                    date: "Date de Prescription",
                    prescriptionSeniority: "Ancienneté de l’ordonnance",
                    month: " mois",
                    days: "< 1 mois",
                    year: " an",
                    years: " ans",
                },
                audioprosthetist: {
                    title: "Audioprothésiste",
                    social: "Raison sociale",
                    login: "Identifiant",
                    phone: "Téléphone",
                    email: "Email",
                    emailNetwork: "Email Audio Réseau",
                    address: "Adresse",
                },
                audioprosthetistCenter: {
                    title: "Audioprothésiste du centre",
                    surname: "Nom",
                    name: "Prénom",
                    adeliNumber: "Numéro ADELI audioprothésiste",
                    rpps: "Numéro RPPS audioprothésiste",
                },
            },
            equipment: {
                title: "Equipement",
                beneficiary: {
                    title: "Bénéficiaire",
                    socialSecrityNumber: "Numéro SS",
                    omc: "Nom de l'Omc",
                    surname: "Nom",
                    name: "Prénom",
                    regime: "Régime",
                },
                contactInfo: {
                    title: "Informations de contact",
                    mail: "Email",
                    phone: "Téléphone",
                },
                prescriber: {
                    title: "Prescripteur",
                    surname: "Nom",
                    name: "Prénom",
                    psRpps: "Numéro RPPS",
                    adeliNumber: "Numéro ADELI",
                },
                prescriptionDtl: {
                    title: "Prescription",
                    primoDelivrance: "Primo délivrance",
                    equipmentRenewal: "Renouvellement de l'équipement",
                    modificationRenewal:
                        "Renouvellement avec modification de la correction",
                },
                motivation: {
                    title: "Motif de l'équipement et commentaires",
                    equipment: "Motif de l'équipement",
                    comment: "Commentaires",
                },
                glassAdditionalInfo: {
                    title: "Détail du verre",
                    name: "Nom du verre",
                    edi: "Code EDI",
                    type: "Type de verre",
                    indice: "Indice",
                    material: "Matière",
                    surface: "Surface",
                    technicity: "Technicité du verre",
                    antiGlare: "Niveau d'antireflet",
                    photochromatic: "Photochromique",
                    paint: "Teinté",
                    activity: "Activité",
                    kaliviaGlass: "Verre Kalivia",
                    kaliviaGlassQualified: "Verre Kalivia qualifié",
                    antiReflection: "Antireflet",
                    comments: "Commentaires",
                },
                details: {
                    title: "Détail de l'équipement",
                    verres: "Verres",
                    lentiles: "Lentilles",
                    offresMalinTitle: "Les Offres \"Malin\"",
                    offresMalinPrim: "Verres \"Offre Malin Prim\" ?",
                    offresMalinPlus: "Verres \"Offre Malin Plus\" ?",
                    lunetteClasse: "Classe pour les verres",
                    reimbursableLabel: {
                        lunette: "Lunettes",
                        lentiles:
                            "Lentilles remboursées par l'assurance Maladie",
                        lentilesNon:
                            "Lentilles non remboursées par l'assurance Maladie",
                        default:
                            "Lunettes/ Lentilles remboursées par l'assurance Maladie",
                    },
                    leftEye: "Oeil Droit",
                    rightEye: "Oeil Gauche",
                    leftSupplements:
                        "Supplément remboursé par l'assurance maladie OD",
                    rightSupplements:
                        "Supplément remboursé par l'assurance maladie OG",
                    refundGrassesTotal:
                        "Remboursement verres et suppléments ou Lentilles",
                    totalRefund: "Remboursement total pour la prestation",
                    sphere: "Sphère",
                    axe: "Axe",
                    cylinder: "Cylindre",
                    addition: "Addition",
                    prism: "Prisme",
                    lpp: "LPP",
                    tc: "TC",
                    ro: "RO",
                    mount: "Monture",
                    mountClasse: "Classe",
                    brand: "Marque",
                    model: "Modèle",
                    montage: "Montage",
                    storePrice: "Prix affiché en magasin ",
                    framePrice: "Prix monture",
                    glassesSupplements: "Verres et suppléments",
                    provider: "Fournisseur",
                    providerRight: "Fournisseur Verre OD",
                    providerLeft: "Fournisseur Verre OG",
                    glassesDifference: "Différences verres",
                    glassName: "Nom du verre",
                    glassPrice:
                        "Prix du verre (suppléments hors prisme inclus)",
                    verreGDIdentiqueTitle: "Verres OD/OG",
                    verreGDIdentique: "Mêmes verres OD/OG",
                    verreGDNotIdentique: "Verres différents OD/OG",
                    galbeFace: "Galbe de la face",
                    inclinaisonMonture:
                        "Inclinaison de la monture (Angle pantoscopique)",
                    distanceVerreOeil: "Distance verre-l'oeil",
                    individualGlassesLabel:
                        "Mesure digitale pour verre individualisé",
                    ecartVLVP: "Différence des écarts pupillaires VL/VP",
                    priceGlassesSupplements: "Prix des suppléments verres",
                    precalibrage: "Précalibrage",
                    cylinderUpperSphere: "Cylindre/Sphère supérieur",
                    color: "Teinte",
                    uv: "Filtre chromatique ou UV",
                    ryser: "Ryser",
                    antiptosis: "Système antiptosis",
                    presson: "PressOn",
                    lentilsTitle: "Lentilles",
                    lentilsSupplierLeft: "Fournisseur lentille oeil droit",
                    lentilsSupplierRight: "Fournisseur lentille oeil gauche",
                    lentilsDifference: "Différences lentilles",
                    lentilsModelsTitle: "Modèles de lentilles",
                    lentilsRightEye: "Nom de la lentille oeil droit",
                    lentilsLeftEye: "Nom de la lentille oeil gauche",
                    lentilsRightEyeBoxNumber:
                        "Nombre de boîtes lentille oeil droit",
                    lentilsLeftEyeBoxNumber:
                        "Nombre de boîtes lentille oeil gauche",
                    lentilsUnitPriceRightEye:
                        "Prix unitaire oeil droit (par boîte)",
                    lentilsUnitPriceLeftEye:
                        "Prix unitaire oeil gauche (par boîte)",
                    lentilsTotalPriceRightEye:
                        "Prix total lentilles oeil droit",
                    lentilsTotalPriceLeftEye:
                        "Prix total lentilles oeil gauche",
                },
            },
            pec: {
                title: "Prise en charge",
                dossier: {
                    title: "Dossier",
                    number: "N° de Dossier",
                    creationDate: "Date de Création",
                    canal: "Canal de saisie",
                },
                controlResults: {
                    title: "Résultats du contrôle de fréquence PEC",
                    resultsLabel: "Résultats du contrôle de fréquence PEC",
                },
                motivation: {
                    title: "Motif de l'équipement et commentaires",
                    equipment: "Motif de l'équipement",
                    pecInputMode: "Mode de saisie PEC",
                    refusal: "Motif (si refus)",
                    tpRo: "Je m'engage à faire le Tiers payant sur la part du Régime Obligatoire, l'OCAM se réservant le droit de vérifier l'exactitude de cette information",
                    comments: "Commentaires",
                    pecDate: "Date de Prise en Charge (ou de refus)",
                    detailedInformation: "Informations détaillées",
                    totalGlobal: "Total Global",
                },
                details: {
                    title: "Détail de la Prise en Charge",
                    rightEarDevice: "Appareil Oreille Droite",
                    leftEarDevice: "Appareil Oreille Gauche",
                    rightEarRepairMaintenance:
                        "Entretien Réparation Oreille Droite",
                    leftEarRepairMaintenance:
                        "Entretien Réparation Oreille Gauche",
                    rightEarAccessoriesAndServices:
                        "Accessoires et prestations Oreille Droite",
                    leftEarAccessoriesAndServices:
                        "Accessoires et prestations Oreille Gauche",
                    total: "Total",
                    type: "Type",
                    class: "100% santé",
                    maker: "Fabricant",
                    brand: "Marque",
                    form: "Forme",
                    model: "Modèle",
                    codeLPP: "Code LPP",
                    codeLPPGeneric: "Code LPP générique",
                    codeAct: "Code Acte",
                    dMax: "Dmax",
                    tc: "TC",
                    ro: "RO",
                    rc: "RC",
                    rac: "RAC",
                    totalPrestation: "Total (P)",
                },
            },
            renouvellement: {
                title: "Renouvellement",
                details: "Détails",
                previous: "Dossier précédent",
                actual: "Dossier actuel",
                detailsDossier: {
                    title: "Détails du dossier",
                    dossierDelay: "Délai minimum entre deux équipements",
                    dossierDate: "Date du dossier",
                    dossierNumber: "Numéro de dossier",
                    benefAge:
                        "Âge du bénéficiaire lors de la création de la PEC",
                    psFiness: "FINESS",
                    orderDate: "Date de l'ordonnance",
                    orderUsage: "Utilisation de l'ordonnance",
                    question:
                        "La case «renouvellement avec modification de la correction» a-t-elle été cochée?",
                    criteria: "Renouvellement avec modification de la vue",
                },
                detailsEquipment: {
                    title: "Détails de l'équipement",
                    left: "OG",
                    right: "OD",
                    vision: "Type de vision",
                    sphere: "Sphére",
                    cylindre: "Cylindre",
                    axe: "Axe",
                    addition: "Addition",
                    prisme: "Prisme",
                    maladie: "Supplément remboursé par l'assurance maladie",
                },
            },
        },
        documentStatus: {
            NOT_RECEIVED: "Pièce non réceptionnée",
            RECEIVED: "En attente validation",
            ACCEPTED: "Validé",
            REJECTED: "Rejeté",
        },
        viewDocument: "View",

        documentValidation: {
            documentValidationLabel: "Analyse de la pièce justificative",
            documentValidationLabelWithoutPJ: "Analyse globale",
            documentReceivedLabel:
                "Cette pièce justificative a-t-elle été réceptionnée ?",
            documentReceivedTooltip:
                "Permet d'indiquer si le bon document correspondant au type attendu est reçu.",
            documentValidLabel:
                "Le contenu de la pièce justificative est-il valide ?",
            documentValidLabelWithoutPJ: "Le dossier est-il valide ?",
            documentValidTooltip:
                "Permet d'indiquer si le contenu du document est correct et si le document est valide ou non.",

            notValidated: "Ce document n'est pas encore validé",
            notValidatedWithoutPJ: "Ce dossier n'est pas encore validé",
            rejected:
                "Ce document a été rejeté avec le motif indiqué ci-dessous.",
            accepted: "Ce document a été validé.",
        },
        relaunch: {
            send: "Envoyer",
            cancel: "Annuler",
        },
        dossierEvaluationHistory: {
            email: {
                from: "From: ",
                to: "To: ",
                cc: "Cc: ",
                topic: "Topic: ",
                body: "Body: ",
                attachments: "Attachments:",
            },
            comments: "Commentaire PS",
        },
    },
    justificationHistory: {
        pageTitle: "Historique : ",
        mainTitle: "Configuration du Processus de justification ",
        contextTitle: "Contexte",
        requestTitle: "Sélectionner PJ(s)",
        stepsConfigurationTitle: "Définir étapes et actions",
        manualEvents: "Définir évènement manuel",

        configurationName: "Libellé de la configuration",
        validityStartDate: "Date de début de validité",
        validityEndDate: "Date de fin de validité",

        stepNameLabel: "Libellé de l'étape",
        period: "Période",
        jourPlus: "j+",
        action: "Action: ",
        SEND_MAIL: {
            from: "DE",
            topic: "Sujet :",
            cc: "Cc",
            attachments: "Pièces jointes(s)",
            message: "Texte de l'e-mail",
        },
        motives: "Motives defined for this document",

        omcs: "OMC(s)",
        disciplines: "Discipline(s)",
        networks: "Réseau(x)",
        nothingToDisplay: "Aucune configuration à montrer",
    },
    chooseMcTask: {
        manualControl: "Contrôle manuel",
        resultsPerPage: "Résultats par page",
        viewJPlusLabel: "Vue J+",
        viewEMinusLabel: "Vue E-",
        viewCLabel: "Vue C",
        filterCriteria: "Critères de filtrage",
        searchCriteriaLabel: "Critères de recherche",
        noResults: "Aucun résultat trouvé",
        viewSearchLabel: "Recherche dossier(s) à contrôler",
        descriptionJPlus:
            "La colonne J+ indique en nombre de jours le délai entre la demande et la réception des PJ",
        descriptionEMinus:
            "Liste des dossiers à contrôler pour lesquels la date d'échéance convenue avec le client approche. Classification par colonne Montant RC en ordre décroissant.",
        descriptionC:
            "Liste des dossiers à contrôler pour lesquels la date d'échéance suivant la convention Viamedis approche. Classification par colonne C, nombre de jours restant à partir de la réception des PJ et la date d'échéance conventionnelle, ordre décroissant. ",
        modal: {
            title: "Etes-vous sûr de vouloir reprendre ce dossier verrouillé ?",
            text: (name) =>
                `Le dossier est déjà ouvert pour traitement par l’utilisateur ${name}. Voulez-vous continuer?`,
            confirm: "Confirmer",
            close: "Annuler",
        },
        tooltip: {
            locked: (user) => `Verrouillé par : ${user}`,
            yours: "Continuer le travail sur son dossier",
            free: "Prendre le dossier pour contrôle",
        },
        columns: {
            creationDate: "Date mise en attente",
            dossier: "Numéro dossier",
            omc: "OMC(s)",
            daysToReceivePJ: "J+",
            daysLeftForAnalyze: "E-",
            daysUntilSLAExpires: "C",
            dossierRC: "Montant RC",
            currentJob: "Actions",
            ps: "FINESS",
            beneficiaryNumeroAdherent: "Numéro Adhérent",
            beneficiaryLastName: "Nom de l'assuré",
            beneficiaryFirstName: "Prénom de l'assuré",
            justificationStatus: "Statut dossier",
            network: "Réseau",
        },
        searchCriteria: {
            ps: "FINESS",
            dossier: "Numéro dossier",
            omc: "Code OMC",
            beneficiaryNumeroAdherent: "Numéro Adhérent",
            beneficiaryLastName: "Nom de l'assuré",
            beneficiaryFirstName: "Prénom de l'assuré",
            omcFilterLabel: "OMC sélectionnés",
            allNetworks: "Toutes origines",
            allStatuses: "Tous statuts",
        },
    },
    statisticsHome: {
        statistics: "Statistiques",
        teamPerformance: "Rapports performance des équipes",
        productValue: "Rapports valeur de produit",
        notControlled: "Dossiers non contrôlés en nombre et en montant",
        averageProcessingTime:
            "Temps moyen de traitement d'un dossier en nombre de jours",
        stoppedForControl: "Dossiers annulés par gestionnaire, en €",
        stoppedVsCanceledNumber:
            "Dossiers mis en attente contre annulés par client, en nombre",
        stoppedVsCanceledAmount:
            "Dossiers mis en attente contre annulés par client, en euros",
        selectClient: "Client",
        selectTeam: "Equipe",
        selectMonth: "Mois",
        selectMonthFrom: "de",
        selectMonthTo: "à",
        selectFrom: "de",
        selectUntil: "à",
        generate: "Générer",
        controlledByPeriod: "Dossiers contrôlés par client",
        criteriaTitle: "Sélectionner les critères statistique",
        fromGtTo:
            "Veillez sélectionner un mois de début de la période antérieur au mois de fin de la période",
        fromGtCM:
            "La fin de la période sélectionnée doit être antérieure ou égale au mois en cours.",
        fromGtToDate:
            "La date de début de la période doit être antérieure ou égale à la date de fin de la période.",
        fromDateShouldBeBeforeTommorow:
            "La date de début de la période doit être antérieure ou égale à la date de jour.",
        toDateShouldBeBeforeTommorow:
            "La date de fin de la période doit être antérieure ou égale à la date de jour.",
        status: "Statut",
        periodicity: "Périodicité",
    },
    stoppedVsCancelledGain: {
        title: "Dossiers mis en attente contre annulés par client, en €",
        fields: {
            fraudControlType: "Contrôle",
            amountRCStopped: "Montant RC de dossiers mis en attente",
            amountRCCancelled: "Montant RC de dossiers annulés",
            amountPercentageCancelled: "% des dossiers annulés",
        },
    },
    stoppedVsCancelledInNumber: {
        title: "Mis en attente contre annulés par client",
        fields: {
            fraudControlType: "Contrôle",
            dossierNumberCancelled: "Nb de dossiers annulés par le contrôle",
            dossierNumberStopped:
                "Nb de dossiers mis en attente par le contrôle",
            numberPercentageCancelled: "% des dossiers annulés",
        },
    },
    notControlledByTeam: {
        title: "Dossiers non contrôlés en nombre et en montant",
        fields: {
            month: "Mois",
            notControlledNumber: "Dossiers non contrôlés en nombre",
            notControlledEur: "Facturés, EUR",
            notControlledEurTooltipLabel: "Facturés",
            notControlledEurTooltipValue: "EUR",
        },
    },
    averageTimeToProcessDossier: {
        title: "Temps moyen de traitement d'un dossier en nombre de jours",
        fields: {
            month: "Mois",
            averageTime: "Délai moyen de traitement dossier",
        },
    },
    controlledByPeriod: {
        title: "Dossiers contrôlés par client",
        fields: {
            periodAndClient: "Période / Client",
            all: "Tous",
            cancelled: "Annulés",
            processed: "Facturés",
            total: "Total",
        },
    },
    cancelledPerUserPerMonth: {
        title: "Dossiers annulés par gestionnaire, en €",
        fields: {
            month: "Mois",
            user: "Gestionnaire",
            cancelledRCAmount: "Montant RC",
        },
    },
    userManagement: {
        title: "Gestion des utilisateurs",
        networks: "Réseaux",
        fields: {
            month: "Mois",
            user: "Gestionnaire",
            cancelledRCAmount: "Montant RC",
        },
        clients: {
            name: "Clients",
            title: "Clients configurés",
            columns: {
                label: "Nom du client",
                omc: "OMC(s)",
                actions: "Actions",
            },
        },
        teams: {
            name: "Equipes",
            title: "Equipes configurés",
            columns: {
                label: "Nom de l'équipe",
                client: "Client",
                actions: "Actions",
            },
        },
        users: {
            name: "Utilisateurs",
            title: "Utilisateurs configurés",
            columns: {
                lastName: "Nom de famille",
                firstName: "Prénom",
                client: "Client",
                team: "Equipe assignée",
                userProfile: "Profil assigné",
                actions: "Actions",
            },
        },
        fraudProfiles: {
            name: "Profils",
            title: "Profils configurés",
            columns: {
                label: "Nom du profil",
                client: "Client",
                actions: "Actions",
            },
        },
        omcs: {
            title: "Catalogue OMC(s)",
            name: "OMCs",
            columns: {
                name: "Libellé OMC",
                identity: "Identifiant OMC",
                actions: "Actions",
            },
        },
        columns: {
            creationDate: "Date mise en attente",
            dossier: "Numéro dossier",
            omc: "OMC(s)",
            daysToReceivePJ: "J+",
            daysLeftForAnalyze: "E-",
            daysUntilSLAExpires: "C",
            dossierRC: "Montant RC",
            currentJob: "Actions",
            ps: "FINESS",
            beneficiaryNumSs: "Numéro S.S.",
            beneficiaryLastName: "Nom de l'assuré",
            beneficiaryFirstName: "Prénom de l'assuré",
            justificationStatus: "Statut dossier",
            network: "Réseau",
        },
    },
    library: {
        motiveSet: {
            title: "Liste de motifs",
            columns: {
                name: "Libellé de motif de suppression",
                createdBy: "Créé par",
                createdOn: "Créé le",
                actions: "Actions",
            },
        },
        omcs: {
            title: "Catalogue OMC(s)",
            columns: {
                name: "Libellé OMC",
                identity: "Identifiant OMC",
                clientLabel: "Client",
                actions: "Actions",
            },
        },
        networks: {
            title: "Catalogue réseaux",
            columns: {
                name: "Libellé réseau",
                createdBy: "Créé par",
                createdOn: "Créé le",
                identity: "Identifiant réseau",
                actions: "Actions",
            },
        },
        clients: {
            name: "Clients",
            title: "Clients configurés",
            columns: {
                label: "Nom du client",
                omcCount: "OMC(s)",
                teamCount: "Equipes",
                userProfileCount: "Profils",
                userCount: "Nombre d’utilisateurs",
                actions: "Actions",
            },
        },
        teams: {
            name: "Equipes",
            title: "Equipes configurés",
            columns: {
                label: "Nom de l'équipe",
                clientLabel: "Client",
                userCount: "Nombre d’utilisateurs",
                actions: "Actions",
            },
        },
        users: {
            name: "Utilisateurs",
            title: "Utilisateurs configurés",
            columns: {
                lastName: "Nom de famille",
                firstName: "Prénom",
                email: "Adresse e-mail",
                clientLabel: "Client",
                teamLabel: "Equipe assignée",
                userProfileLabel: "Profil assigné",
                actions: "Actions",
            },
        },
        fraudProfiles: {
            name: "Profils",
            title: "Profils configurés",
            columns: {
                label: "Nom du profil",
                clientLabel: "Client",
                userCount: "Nombre d’utilisateurs",
                actions: "Actions",
            },
        },
    },
    itemsView: {
        createLabel: "Créer",
    },
    editEntity: {
        configure: "Configurer",
        resetPassword: "Réinitialiser MdP",
        clients: {
            title: "Configuration des clients",
            selectOMC: "Sélectionner les OMC(s) pour le client",
            name: "Libellé",
            identity: "Code client",
            slaDays: "SLA",
            managesAll: "Gère tous les clients",
        },
        teams: {
            title: "Configuration des équipes",
            selectClient: "Sélectionner client",
            name: "Nom de l'équpe",
        },
        fraudProfiles: {
            title: "Configuration des profils",
            selectClient: "Sélectionner client",
            name: "Nom du profil",
        },
        users: {
            title: "Configuration des utilisateurs",
            selectClient: "Sélectionner client",
            lastName: "Nom de famille",
            firstName: "Prénom",
            email: "example@domain.com",
            selectDetails: "Assigner l'utilisateur à un profil et à une équipe",
            client: "Client",
            profile: "Profil",
            team: "Equipe",
        },
        motiveSet: {
            title: "Liste de motifs",
            name: "Libellé de la liste des motif",
            selectMotive: "Inclure motif",
            newMotive: "Motif",
            addMotive: "Ajouter motif",
            included: " inclus",
            condition: "Prix",
            label: "Libellé",
        },
        omcs: {
            title: "Catalogue OMC(s)",
            breadcrumbLabel: "OMC",
            name: "Code OMC",
            identity: "Identifiant OMC",
            selectClient: "Sélectionner client",
            rcMin: "RC minimum pour mise en attente",
            columns: {
                name: "Libellé OMC",
                actions: "Actions",
            },
        },
        networks: {
            title: "Catalogue réseaux",
            breadcrumbLabel: "Réseaux",
            name: "Libellé réseau",
            identity: "Identifiant réseau",
            columns: {
                name: "Libellé réseau",
                actions: "Actions",
            },
        },
    },
    resetPasswordEmailResult: {
        text: "Un e-mail a été envoyé à votre adresse e-mail avec un lien vers une page de création de nouveau mot de passe.",
    },
    updatePassword: {
        newPassword: "Nouveau mot de passe",
        newPasswordR: "Saisir de nouveau le mot de passe",
        title: "Votre mot de passe doit contenir au moins 12 caractères, avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial.",
        matchError:
            "Le mot de passe de validation ne correspond pas au mot de passe saisi précédemment.",
        ruleError: "Le mot de passe ne respecte pas le format préconisé. ",
        updatePasswordResult: {
            text: "Le mot de passe est créé avec succès.",
        },
    },
    dataikuFlow: {
        name: "Suivi des FLUX",
        title: "Rechercher le résultat des contrôles pour un dossier",
        searchCriteria: {
            dossier: "Numéro de dossier",
        },
        noResults: (dossier) => `Aucun résultat trouvé par : ${dossier}`,
        flowIn: "Flux Aller",
        flowOut: "Flux Retour",
        discipline: "Discipline",
        dossier: "Numéro de dossier",
        omc: "Code OMC:",
        network: "Réseaux:",
        ps: "PS:",
        fraudulent: "Fraudulent ",
        noDetails: "No additional detail",
    },
    indicators: {
        titles: {
            SLA: "SLA",
            dossiersProductivity: "Productivité - Dossiers",
            tempsProductivity: "Productivité - Temps",
            incompleteDossiers: "Dossiers non complets",

            gainsMain: "Cumul des gains",
            gains: "Gains",
            gainsEquipmentType: "Type d'équipement",
            gainsNetwork: "Réseau / Hors Réseau",
            gainsOMC: "OMC",

            onHoldMain: "PEC reçues et taux de mise en attente",
            onHold: "PEC mises en attente",
            onHoldEquipmentType: "Type d'équipement",
            onHoldNetwork: "Réseau / Hors Réseau",
            onHoldOMC: "OMC",
            onHoldControls: "Mises en attente par contrôle",

            deleted: "PEC supprimées",
            deletedMain: "PEC mises en attente et taux de PEC supprimées",
            suppressionType: "Type de suppression",
            suppressionMotive: "Top motifs de suppression",
            controlEfficiency: "Efficacité des contrôles",
        },
        chooseGraph: "Choisissez un graphique",
        expand: "Consulter",
        filters: {
            omc: "OMC",
            omcGroup: "Groupe d'OMC",
            omcGroupUnselectedText: "Choisir un groupe",
            login: "login",
            from: "de",
            to: "à",
            export: "exporter",
            recalc: "recalculer",
            periodicity: {
                label: "Périodicité",
                daily: "Jour",
                weekly: "Semaine",
                monthly: "Mois",
                quarterly: "Trimestre",
                semiAnnual: "Semestre",
                annual: "Année",
            },
        },
        noDataAlert: {
            title: "Les filtres que vous avez saisis ne sont pas valides",
            text: "Veuillez saisir des filtres valides",
        },
        euros: "euros",
    },
    operationalManagementHome: {
        title: "Pilotage Opérationnel",
    },
    clientManagementHome: {
        title: "Indicateurs clients",
    },
    configOMIndicators: {
        name: "Configuration du Pilotage Opérationnel",
        buttonSave: "Enregistrer",
        successMessage: "Vos modifications ont été enregistrées avec succès",
        unsuccessMessage: "Impossible d'enregistrer un groupe OMC sans nom",
        ok: "OK",
    },
    configCMIndicators: {
        name: "Configuration des Indicateurs Clients",
        buttonSave: "Enregistrer",
        successMessage: "Vos modifications ont été enregistrées avec succès",
        ok: "OK",
    },
    colorRange: {
        name: "nom",
        from: "de",
        to: "à",
    },
    groupRange: {
        name: "groupe nom",
        cancel: "Annuler",
        groupNameImpossibleChangeMessage:
            "Impossible de modifier le nom du groupe par défaut",
        groupImpossibleDeleteMessage:
            "Impossible de supprimer le groupe par défaut",
        groupNameImpossibleRenameMessage:
            "Impossible de définir deux groupes avec le même nom",
    },
    defaultGroup: {
        unselectedText: "Choisir un groupe",
    },
};

export default fr;
