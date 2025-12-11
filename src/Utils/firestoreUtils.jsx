import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase";

// Create or update user document
export const createUserDocument = async (userId, userData) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(
      userRef,
      {
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
    return { success: true };
  } catch (error) {
    console.error("Error creating user document:", error);
    return { success: false, error: error.message };
  }
};

// Get user document
export const getUserDocument = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { success: true, data: userSnap.data() };
    } else {
      return { success: false, error: "User not found" };
    }
  } catch (error) {
    console.error("Error getting user document:", error);
    return { success: false, error: error.message };
  }
};

// Update user subscription
export const updateUserSubscription = async (userId, subscriptionData) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      subscription: subscriptionData,
      updatedAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating subscription:", error);
    return { success: false, error: error.message };
  }
};

// Check if user is admin
export const checkAdminStatus = async (email) => {
  // You can store admin emails in Firestore or check against a hardcoded list
  const adminEmails = ["admin@netflix.com"];
  return adminEmails.includes(email);
};

// Create admin document (call this once to set up admin)
export const createAdminDocument = async (adminEmail) => {
  try {
    const adminRef = doc(db, "admins", adminEmail);
    await setDoc(adminRef, {
      email: adminEmail,
      role: "admin",
      createdAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error creating admin document:", error);
    return { success: false, error: error.message };
  }
};

// Get all users (for admin dashboard)
export const getAllUsers = async () => {
  try {
    const { collection, getDocs, query, orderBy } = await import(
      "firebase/firestore"
    );
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, data: users };
  } catch (error) {
    console.error("Error getting all users:", error);
    return { success: false, error: error.message, data: [] };
  }
};

// Get dashboard statistics
export const getDashboardStats = async () => {
  try {
    const result = await getAllUsers();
    if (!result.success) {
      return { success: false, error: result.error };
    }

    const users = result.data;
    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    // Calculate stats
    const totalUsers = users.length;
    const activeSubscriptions = users.filter(
      (user) => user.subscription?.isPaid
    ).length;
    const newSignupsToday = users.filter((user) => {
      const createdAt = new Date(user.createdAt);
      return createdAt >= todayStart;
    }).length;

    // Calculate total revenue (rough estimate based on plan prices)
    const planPrices = { basic: 9.99, standard: 15.49, premium: 19.99 };
    const totalRevenue = users.reduce((sum, user) => {
      if (user.subscription?.isPaid && user.subscription?.plan) {
        return sum + (planPrices[user.subscription.plan] || 0);
      }
      return sum;
    }, 0);

    return {
      success: true,
      data: {
        totalUsers,
        activeSubscriptions,
        totalRevenue: totalRevenue.toFixed(2),
        newSignups: newSignupsToday,
      },
    };
  } catch (error) {
    console.error("Error getting dashboard stats:", error);
    return { success: false, error: error.message };
  }
};
