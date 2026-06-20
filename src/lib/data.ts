// src/lib/data.ts
// Centralized static data for the PaisaRupay site.

export interface Problem {
    id: number;
    title: string;
    description: string;
    tag: string;
    icon: string;
}

/**
 * The six core problems faced by loan applicants.
 * Used in full on the homepage and as a 3-item subset on the free consultation page.
 */
export const PROBLEMS: Problem[] = [
    {
        id: 1,
        title: 'Nobody tells you the full cost',
        description: 'Processing charges, prepayment penalties, late fees that you only find out about them after you have already signed the papers.',
        tag: 'HIDDEN FEES',
        icon: 'hidden_fees.svg',
    },
    {
        id: 2,
        title: 'Every bank wants the same forms again',
        description: 'Each lender has its own process and its own paperwork. You spend weeks repeating yourself and still leave without a clear answer.',
        tag: 'BANK VISITS',
        icon: 'bank_visits.svg',
    },
    {
        id: 3,
        title: 'Your loan lives across six different tabs',
        description: 'Agent calls, bank emails, loan portals, there is no single place to see where things actually stand with your application.',
        tag: 'MULTIPLE POCs*',
        icon: 'multiple_pocs.svg',
    },
    {
        id: 4,
        title: 'One inquiry turns into weeks of calls',
        description: 'The moment you show interest, your number gets shared. Lenders you never contacted start calling and they do not stop.',
        tag: 'SPAM CALLS',
        icon: 'spam_calls.svg',
    },
    {
        id: 5,
        title: 'You apply without knowing your chances',
        description: 'There is no way to know if a bank will approve you before you apply. Every rejection quietly leaves a mark on your credit score.',
        tag: 'BLIND APPLICATIONS',
        icon: 'blind_applications.svg',
    },
    {
        id: 6,
        title: 'You never know who sees your documents',
        description: 'PAN card, income proof, bank statements, once you hand them over, you have no visibility into who they are shared with next.',
        tag: 'DATA SAFETY',
        icon: 'data_safety.svg',
    },
];
