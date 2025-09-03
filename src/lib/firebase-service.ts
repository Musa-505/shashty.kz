
'use server';

import { db } from '@/lib/firebase/clientApp';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp, where, writeBatch } from 'firebase/firestore';
import type { Person, Submission, Article, News, GenealogyMember } from './types';
import { revalidatePath } from 'next/cache';

const PEOPLE_COLLECTION = 'people';
const ARTICLES_COLLECTION = 'articles';
const NEWS_COLLECTION = 'news';
const SUBMISSIONS_COLLECTION = 'submissions';
const GENEALOGY_COLLECTION = 'genealogy';


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
        slug: data.slug,
        title: data.title,
        summary: data.summary,
        content: data.content,
        author: data.author,
        date: data.date,
        tags: data.tags || [],
        imageUrls: data.imageUrls || [],
        imageHint: data.imageHint || '',
    };
};


export async function createArticle(articleData: Omit<Article, 'id'>) {
    try {
        const docRef = await addDoc(collection(db, ARTICLES_COLLECTION), articleData);
        revalidatePath('/admin/articles');
        revalidatePath('/articles');
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error creating article: ", error);
        return { success: false, error: "Failed to create article." };
    }
}

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

export async function getArticleById(id: string): Promise<Article | null> {
    const docRef = doc(db, ARTICLES_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? articleFromFirestore(docSnap) : null;
}

export async function updateArticle(id: string, articleData: Partial<Article>) {
    try {
        const articleRef = doc(db, ARTICLES_COLLECTION, id);
        await updateDoc(articleRef, articleData);
        revalidatePath('/admin/articles');
        revalidatePath(`/admin/articles/${id}/edit`);
        revalidatePath('/articles');
        revalidatePath(`/articles/${articleData.slug}`);
        return { success: true };
    } catch (error) {
        console.error("Error updating article: ", error);
        return { success: false, error: "Failed to update article." };
    }
}

export async function deleteArticle(id: string) {
    try {
        await deleteDoc(doc(db, ARTICLES_COLLECTION, id));
        revalidatePath('/admin/articles');
        revalidatePath('/articles');
        return { success: true };
    } catch (error) {
        console.error("Error deleting article: ", error);
        return { success: false, error: "Failed to delete article." };
    }
}


// =========== News Functions ===========

const newsFromFirestore = (doc: any): News => {
    const data = doc.data();
    return {
        id: doc.id,
        slug: data.slug,
        title: data.title,
        summary: data.summary,
        content: data.content,
        date: data.date,
        category: data.category,
        imageUrls: data.imageUrls || [],
        imageHint: data.imageHint || '',
    };
};

export async function createNewsItem(newsData: Omit<News, 'id'>) {
    try {
        const docRef = await addDoc(collection(db, NEWS_COLLECTION), newsData);
        revalidatePath('/admin/news');
        revalidatePath('/news');
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error creating news item: ", error);
        return { success: false, error: "Failed to create news item." };
    }
}

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


export async function getNewsItemById(id: string): Promise<News | null> {
    const docRef = doc(db, NEWS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? newsFromFirestore(docSnap) : null;
}

export async function updateNewsItem(id: string, newsData: Partial<News>) {
    try {
        const newsRef = doc(db, NEWS_COLLECTION, id);
        await updateDoc(newsRef, newsData);
        revalidatePath('/admin/news');
        revalidatePath(`/admin/news/${id}/edit`);
        revalidatePath('/news');
        revalidatePath(`/news/${newsData.slug}`);
        return { success: true };
    } catch (error) {
        console.error("Error updating news item: ", error);
        return { success: false, error: "Failed to update news item." };
    }
}

export async function deleteNewsItem(id: string) {
    try {
        await deleteDoc(doc(db, NEWS_COLLECTION, id));
        revalidatePath('/admin/news');
        revalidatePath('/news');
        return { success: true };
    } catch (error) {
        console.error("Error deleting news item: ", error);
        return { success: false, error: "Failed to delete news item." };
    }
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

// =========== Genealogy Functions ===========

const genealogyMemberFromFirestore = (doc: any): GenealogyMember => {
    const data = doc.data();
    return {
        id: doc.id,
        name: data.name,
        parentId: data.parentId || null,
    };
};

export async function createGenealogyMember(memberData: Omit<GenealogyMember, 'id'>) {
    try {
        const docRef = await addDoc(collection(db, GENEALOGY_COLLECTION), memberData);
        revalidatePath('/admin/genealogy');
        revalidatePath('/genealogy');
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error creating genealogy member: ", error);
        return { success: false, error: "Failed to create genealogy member." };
    }
}

export async function getAllGenealogyMembers(): Promise<GenealogyMember[]> {
    const membersCollection = collection(db, GENEALOGY_COLLECTION);
    const q = query(membersCollection, orderBy("name"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => genealogyMemberFromFirestore(doc));
}

export async function getGenealogyMemberById(id: string): Promise<GenealogyMember | null> {
    const docRef = doc(db, GENEALOGY_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? genealogyMemberFromFirestore(docSnap) : null;
}

export async function getRootGenealogyMember(): Promise<GenealogyMember | null> {
    const q = query(collection(db, GENEALOGY_COLLECTION), where("parentId", "==", null));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    return genealogyMemberFromFirestore(snapshot.docs[0]);
}

export async function getChildrenForMember(parentId: string): Promise<GenealogyMember[]> {
    const q = query(collection(db, GENEALOGY_COLLECTION), where("parentId", "==", parentId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => genealogyMemberFromFirestore(doc));
}

export async function updateGenealogyMember(id: string, memberData: Partial<GenealogyMember>) {
    try {
        const memberRef = doc(db, GENEALOGY_COLLECTION, id);
        await updateDoc(memberRef, memberData);
        revalidatePath('/admin/genealogy');
        revalidatePath(`/admin/genealogy/${id}/edit`);
        revalidatePath('/genealogy');
        return { success: true };
    } catch (error) {
        console.error("Error updating genealogy member: ", error);
        return { success: false, error: "Failed to update genealogy member." };
    }
}

export async function deleteGenealogyMember(id: string): Promise<{ success: boolean; error?: string }> {
    const batch = writeBatch(db);

    try {
        const childrenSnapshot = await getDocs(query(collection(db, GENEALOGY_COLLECTION), where('parentId', '==', id)));
        
        if (!childrenSnapshot.empty) {
            return { success: false, error: "Cannot delete a member with children. Please delete the children first." };
        }

        const memberRef = doc(db, GENEALOGY_COLLECTION, id);
        batch.delete(memberRef);

        await batch.commit();
        
        revalidatePath('/admin/genealogy');
        revalidatePath('/genealogy');
        return { success: true };
    } catch (error) {
        console.error("Error deleting genealogy member: ", error);
        return { success: false, error: "Failed to delete genealogy member." };
    }
}
