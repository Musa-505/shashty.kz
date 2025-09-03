
'use server';

import { db } from '@/lib/firebase/clientApp';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp, where } from 'firebase/firestore';
import type { Person, Submission, Article, News } from './types';
import { revalidatePath } from 'next/cache';

const PEOPLE_COLLECTION = 'people';
const ARTICLES_COLLECTION = 'articles';
const NEWS_COLLECTION = 'news';
const SUBMISSIONS_COLLECTION = 'submissions';


// =========== Person Functions ===========

const personFromFirestore = (doc: any): Person => {
    const data = doc.data();
    return {
        id: doc.id,
        slug: data.slug,
        name: data.name,
        biography: data.biography,
        imageUrls: data.imageUrls || [],
    };
};

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

export async function getAllPeople(): Promise<Person[]> {
    const peopleCollection = collection(db, PEOPLE_COLLECTION);
    const q = query(peopleCollection, orderBy("name"));
    const peopleSnapshot = await getDocs(q);
    return peopleSnapshot.docs.map(doc => personFromFirestore(doc));
}

export async function getPersonBySlug(slug: string): Promise<Person | null> {
    const q = query(collection(db, PEOPLE_COLLECTION), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        return null;
    }
    return personFromFirestore(querySnapshot.docs[0]);
}

export async function getPersonById(id: string): Promise<Person | null> {
    const docRef = doc(db, PEOPLE_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? personFromFirestore(docSnap) : null;
}

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

export async function deletePerson(id: string) {
    try {
        await deleteDoc(doc(db, PEOPLE_COLLECTION, id));
        revalidatePath('/admin/people');
        revalidatePath('/people');
        return { success: true };
    } catch (error) {
        console.error("Error deleting person: ", error);
        return { success: false, error: "Failed to delete person." };
    }
}


// =========== Article Functions ===========

const articleFromFirestore = (doc: any): Article => {
    const data = doc.data();
    return {
        id: doc.id,
        ...data
    };
};

export async function getAllArticles(): Promise<Article[]> {
    const articlesCollection = collection(db, ARTICLES_COLLECTION);
    const q = query(articlesCollection, orderBy("date", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => articleFromFirestore(doc));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    const q = query(collection(db, ARTICLES_COLLECTION), where("slug", "==", slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    return articleFromFirestore(snapshot.docs[0]);
}

// =========== News Functions ===========

const newsFromFirestore = (doc: any): News => {
    const data = doc.data();
    return {
        id: doc.id,
        ...data
    };
};

export async function getAllNewsItems(): Promise<News[]> {
    const newsCollection = collection(db, NEWS_COLLECTION);
    const q = query(newsCollection, orderBy("date", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => newsFromFirestore(doc));
}

export async function getNewsItemBySlug(slug: string): Promise<News | null> {
    const q = query(collection(db, NEWS_COLLECTION), where("slug", "==", slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    return newsFromFirestore(snapshot.docs[0]);
}

// =========== Submission Functions ===========

export async function createSubmission(submissionData: Omit<Submission, 'id' | 'createdAt' | 'status'>) {
    try {
        await addDoc(collection(db, SUBMISSIONS_COLLECTION), {
            ...submissionData,
            status: 'new',
            createdAt: serverTimestamp(),
        });
        revalidatePath('/admin/submissions');
        return { success: true };
    } catch (error) {
        console.error("Error creating submission: ", error);
        return { success: false, error: "Failed to create submission." };
    }
}

export async function getAllSubmissions(): Promise<Submission[]> {
    const submissionsCollection = collection(db, SUBMISSIONS_COLLECTION);
    const q = query(submissionsCollection, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            name: data.name,
            email: data.email,
            type: data.type,
            content: data.content,
            status: data.status,
            createdAt: data.createdAt?.toDate()?.toLocaleString('kk-KZ') || new Date().toLocaleString('kk-KZ'),
        };
    });
}
