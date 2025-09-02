
'use server';

import { db } from '@/lib/firebase/clientApp';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import type { Person } from './types';
import { revalidatePath } from 'next/cache';

const PEOPLE_COLLECTION = 'people';

// Helper function to convert Firestore doc to Person object
const fromFirestore = (doc: any): Person => {
    const data = doc.data();
    return {
        id: doc.id,
        slug: data.slug,
        name: data.name,
        biography: data.biography,
        imageUrls: data.imageUrls || [],
    };
};

// CREATE a new person
export async function createPerson(personData: Omit<Person, 'id'>) {
    try {
        const docRef = await addDoc(collection(db, PEOPLE_COLLECTION), personData);
        revalidatePath('/admin/people');
        revalidatePath('/people');
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error creating person: ", error);
        return { success: false, error: "Failed to create person." };
    }
}

// READ all people
export async function getAllPeople(): Promise<Person[]> {
    const peopleCollection = collection(db, PEOPLE_COLLECTION);
    const q = query(peopleCollection, orderBy("name"));
    const peopleSnapshot = await getDocs(q);
    const peopleList = peopleSnapshot.docs.map(doc => fromFirestore(doc));
    return peopleList;
}


// READ a single person by slug
export async function getPersonBySlug(slug: string): Promise<Person | null> {
    // Note: This is not efficient for large datasets.
    // A better approach would be to query by slug directly if they are unique.
    const people = await getAllPeople();
    const person = people.find(p => p.slug === slug);
    return person || null;
}

// READ a single person by ID
export async function getPersonById(id: string): Promise<Person | null> {
    const docRef = doc(db, PEOPLE_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return fromFirestore(docSnap);
    } else {
        return null;
    }
}


// UPDATE a person
export async function updatePerson(id: string, personData: Partial<Person>) {
    try {
        const personRef = doc(db, PEOPLE_COLLECTION, id);
        await updateDoc(personRef, personData);
        revalidatePath('/admin/people');
        revalidatePath(`/admin/people/${personData.slug}/edit`);
        revalidatePath('/people');
        revalidatePath(`/people/${personData.slug}`);
        return { success: true };
    } catch (error) {
        console.error("Error updating person: ", error);
        return { success: false, error: "Failed to update person." };
    }
}

// DELETE a person
export async function deletePerson(id: string) {
    try {
        const personRef = doc(db, PEOPLE_COLLECTION, id);
        await deleteDoc(personRef);
        revalidatePath('/admin/people');
        revalidatePath('/people');
        return { success: true };
    } catch (error) {
        console.error("Error deleting person: ", error);
        return { success: false, error: "Failed to delete person." };
    }
}
