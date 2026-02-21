export const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return; // guard
    el.scrollIntoView({ behavior: "smooth", block: "start" });
}