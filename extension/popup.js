const API_BASE = "https://mindcave.vercel.app/api";
// const API_BASE = "http://localhost:3000/api"; // For local development

const elements = {
  loading: document.getElementById("loading"),
  loginRequired: document.getElementById("login-required"),
  metadataForm: document.getElementById("metadata-form"),
  success: document.getElementById("success"),
  urlInput: document.getElementById("url"),
  title: document.getElementById("title"),
  description: document.getElementById("description"),
  ogImage: document.getElementById("og-image"),
  favicon: document.getElementById("favicon"),
  categorySelect: document.getElementById("category"),
  saveBtn: document.getElementById("save-btn"),
  closeBtn: document.getElementById("close-btn"),
};

let pageMetadata = null;

async function init() {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab || !tab.url) {
      showError("Could not get current tab URL.");
      return;
    }

    elements.urlInput.value = tab.url;

    // Parallel: fetch metadata and check auth/categories
    const [metaRes, categoriesRes] = await Promise.all([
      fetchMetadata(tab.url),
      fetchCategories(),
    ]);

    if (categoriesRes.status === 401) {
      showLoginRequired();
      return;
    }

    if (categoriesRes.error) {
      showError("Failed to load categories: " + categoriesRes.error);
      return;
    }

    populateCategories(categoriesRes.data);
    displayMetadata(metaRes);

    showForm();
  } catch (err) {
    console.error("Init error:", err);
    showError("An unexpected error occurred.");
  }
}

async function fetchMetadata(url) {
  try {
    const response = await fetch(`${API_BASE}/fetch-metadata`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    return await response.json();
  } catch (err) {
    console.error("Metadata fetch error:", err);
    return {
      title: "",
      description: "",
      og_image_url: null,
      favicon_url: null,
    };
  }
}

async function fetchCategories() {
  try {
    const response = await fetch(`${API_BASE}/categories`);
    if (response.status === 401) return { status: 401 };

    const data = await response.json();
    return { data };
  } catch (err) {
    console.error("Categories fetch error:", err);
    return { error: err.message };
  }
}

function populateCategories(categories) {
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = cat.name;
    elements.categorySelect.appendChild(option);
  });
}

function displayMetadata(meta) {
  pageMetadata = meta;
  elements.title.textContent =
    meta.title || new URL(elements.urlInput.value).hostname;
  elements.description.textContent =
    meta.description || "No description available.";

  if (meta.og_image_url) {
    elements.ogImage.src = meta.og_image_url;
    elements.ogImage.classList.remove("hidden");
  }

  if (meta.favicon_url) {
    elements.favicon.src = meta.favicon_url;
    elements.favicon.classList.remove("hidden");
  }
}

async function saveBookmark() {
  const categoryId = elements.categorySelect.value;
  if (!categoryId) {
    alert("Please select a category.");
    return;
  }

  elements.saveBtn.disabled = true;
  elements.saveBtn.textContent = "Saving...";

  try {
    const response = await fetch(`${API_BASE}/bookmarks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: elements.urlInput.value,
        title: elements.title.textContent,
        description: elements.description.textContent,
        category_id: categoryId,
        og_image_url: pageMetadata?.og_image_url,
        favicon_url: pageMetadata?.favicon_url,
        media_type: pageMetadata?.media_type || "default",
        media_embed_id: pageMetadata?.media_embed_id,
      }),
    });

    if (response.ok) {
      showSuccess();
    } else {
      const err = await response.json();
      throw new Error(err.error || "Failed to save");
    }
  } catch (err) {
    alert("Error: " + err.message);
    elements.saveBtn.disabled = false;
    elements.saveBtn.textContent = "Save Bookmark";
  }
}

function showForm() {
  elements.loading.classList.add("hidden");
  elements.metadataForm.classList.remove("hidden");
}

function showLoginRequired() {
  elements.loading.classList.add("hidden");
  elements.loginRequired.classList.remove("hidden");
}

function showSuccess() {
  elements.metadataForm.classList.add("hidden");
  elements.success.classList.remove("hidden");
}

function showError(msg) {
  elements.loading.innerHTML = `<p style="color: #e74c3c;">${msg}</p>`;
}

elements.saveBtn.addEventListener("click", saveBookmark);
elements.closeBtn.addEventListener("click", () => window.close());

init();
