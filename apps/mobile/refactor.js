const fs = require('fs');
const file = 'd:/WorkSpace/new-project/apps/mobile/app/profile/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Update states
code = code.replace(
  /const \[formData, setFormData\] = useState.+?\\n  const \[isSaving, setIsSaving\] = useState.+?\\n  const \[saveMessage, setSaveMessage\] = useState.+?\\n/g,
  'const [activeEditView, setActiveEditView] = useState<\'personal\' | \'professional\' | \'rates\' | null>(null);\n  const [avatarModalOpen, setAvatarModalOpen] = useState(false);\n'
);

// 2. Remove handleSave from main component
code = code.replace(
  /  async function handleSave\(\) \{[\s\S]+?finally \{ setIsSaving\(false\); setTimeout\(\(\) => setSaveMessage\(""\), 3000\); \}\n  \}\n/g,
  ''
);

// 3. Remove setting formData in loadProfile
code = code.replace(
  /setFormData\(\{[\s\S]+?\}\);/g,
  ''
);

// 4. Replace Logged in UI block
const newLoggedInState = 
  /* ---------------------------------------------------------------------------
     LOGGED IN STATE (profile edit)
     --------------------------------------------------------------------------- */
  if (activeEditView === 'personal') {
    return <EditPersonalDetails profile={profile} token={token} onBack={() => setActiveEditView(null)} onSuccess={() => { setActiveEditView(null); loadProfile(token as string); }} />;
  }
  if (activeEditView === 'professional') {
    return <EditProfessionalInfo profile={profile} token={token} onBack={() => setActiveEditView(null)} onSuccess={() => { setActiveEditView(null); loadProfile(token as string); }} />;
  }
  if (activeEditView === 'rates') {
    return <EditRates profile={profile} token={token} onBack={() => setActiveEditView(null)} onSuccess={() => { setActiveEditView(null); loadProfile(token as string); }} />;
  }

  const initials = ((profile?.fullName as string) || "TL").split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  const avatarUrl = profile?.avatarUrl as string | undefined;

  return (
    <div className="min-h-screen bg-[#EEF6F9]">
      <header className="bg-[#f3fcef] flex justify-between items-center w-full px-6 py-2">
        <h1 className="text-[24px] font-extrabold text-[#006d2f]">TownLink</h1>
        <div className="w-8 h-8 rounded-full overflow-hidden bg-[#00404F] text-white flex items-center justify-center text-xs font-bold shadow-sm">
          {avatarUrl ? <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" /> : initials}
        </div>
      </header>

      <main className="px-6 pt-8 pb-24">
        {/* Profile header */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden shadow-[0_8px_32px_rgba(0,64,79,0.1)] relative bg-[#00404F] text-white flex items-center justify-center text-3xl font-bold">
            {avatarUrl ? <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" /> : initials}
            <button onClick={() => setAvatarModalOpen(true)} className="absolute bottom-0 right-1 bg-[#30CB65] text-white p-1.5 rounded-full border-2 border-white hover:bg-[#006d2f] transition-colors">
              <Edit size={14} />
            </button>
          </div>
          <div className="text-center">
            <h2 className="text-[24px] font-bold text-[#161d16] flex items-center justify-center gap-2">
              {(profile?.fullName as string) || "User"}
              {profile?.verified && (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#006d2f"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
              )}
            </h2>
            <p className="text-[16px] text-[#3d4a3d] font-medium">{(profile?.phone as string) || ""}</p>
          </div>
        </div>

        {/* Edit Menu Cards */}
        <div className="space-y-4 mb-10">
          <button onClick={() => setActiveEditView('personal')} className="w-full bg-white rounded-[24px] p-5 shadow-[0_4px_24px_rgba(0,64,79,0.04)] flex items-center justify-between text-left transition-transform active:scale-[0.98]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#eef6ea] text-[#006d2f] flex items-center justify-center">
                <User size={24} />
              </div>
              <div>
                <h3 className="text-[18px] font-semibold text-[#161d16]">Personal Details</h3>
                <p className="text-[14px] text-[#6d7b6c]">Name, Business, Email, Location</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-[#bccbb9]" />
          </button>

          <button onClick={() => setActiveEditView('professional')} className="w-full bg-white rounded-[24px] p-5 shadow-[0_4px_24px_rgba(0,64,79,0.04)] flex items-center justify-between text-left transition-transform active:scale-[0.98]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#eef6ea] text-[#006d2f] flex items-center justify-center">
                <Briefcase size={24} />
              </div>
              <div>
                <h3 className="text-[18px] font-semibold text-[#161d16]">Professional Info</h3>
                <p className="text-[14px] text-[#6d7b6c]">Services, Experience, Description</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-[#bccbb9]" />
          </button>

          <button onClick={() => setActiveEditView('rates')} className="w-full bg-white rounded-[24px] p-5 shadow-[0_4px_24px_rgba(0,64,79,0.04)] flex items-center justify-between text-left transition-transform active:scale-[0.98]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#eef6ea] text-[#006d2f] flex items-center justify-center">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-[18px] font-semibold text-[#161d16]">Rates & Availability</h3>
                <p className="text-[14px] text-[#6d7b6c]">Status, Pricing, Diaspora</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-[#bccbb9]" />
          </button>
        </div>

        <div className="flex justify-center mb-8">
          <button onClick={handleLogout} className="text-sm font-semibold text-[#ba1a1a] flex items-center gap-2 hover:opacity-80 transition-opacity">
            <LogOut size={18} /> Log Out
          </button>
        </div>
      </main>

      {avatarModalOpen && (
        <AvatarSelectionModal 
          token={token as string} 
          currentAvatar={avatarUrl} 
          onClose={() => setAvatarModalOpen(false)} 
          onSuccess={() => { setAvatarModalOpen(false); loadProfile(token as string); }} 
        />
      )}
    </div>
  );
}
;

const startIndex = code.indexOf('/* ---------------------------------------------------------------------------\r\n     LOGGED IN STATE (profile edit)\r\n     --------------------------------------------------------------------------- */');
if(startIndex === -1) {
  const startIndex2 = code.indexOf('/* ---------------------------------------------------------------------------\\n     LOGGED IN STATE (profile edit)\\n     --------------------------------------------------------------------------- */');
  if(startIndex2 === -1) { console.error('Could not find start index'); process.exit(1); }
  else {
    const endIndex = code.indexOf('}\\n\\n\\n/* ------------------------------------------------------------------------------', startIndex2);
    code = code.substring(0, startIndex2) + newLoggedInState + "\\n\\n\\n" + code.substring(endIndex + 3);
  }
} else {
  const endIndex = code.indexOf('}\\r\\n\\r\\n\\r\\n/* ------------------------------------------------------------------------------', startIndex);
  if(endIndex === -1) {
    const endIndex2 = code.indexOf('}\\n\\n\\n/* ------------------------------------------------------------------------------', startIndex);
    code = code.substring(0, startIndex) + newLoggedInState + "\\n\\n\\n" + code.substring(endIndex2 + 3);
  } else {
    code = code.substring(0, startIndex) + newLoggedInState + "\\n\\n\\n" + code.substring(endIndex + 5);
  }
}

// 5. Append components at the end
const appendedComponents = \

/* ------------------------------------------------------------------------------
   EDIT SUB-VIEWS
   ------------------------------------------------------------------------------ */

function EditPersonalDetails({ profile, token, onBack, onSuccess }: any) {
  const [formData, setFormData] = useState({
    fullName: profile?.fullName || "",
    businessName: profile?.businessName || "",
    email: profile?.email || "",
    region: profile?.region || "",
    city: profile?.city || ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setIsSaving(true); setError("");
    try {
      const res = await fetch(\\user\, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: \Bearer \\ },
        body: JSON.stringify(formData),
      });
      if (res.ok) onSuccess();
      else setError("Failed to save changes.");
    } catch { setError("Network error."); }
    finally { setIsSaving(false); }
  };

  return (
    <div className="min-h-screen bg-[#EEF6F9]">
      <MobileRegHeader onBack={onBack} />
      <div className="px-6 pt-6 pb-24">
        <div className="bg-white rounded-[32px] p-6 shadow-[0_4px_24px_rgba(0,64,79,0.06)]">
          <h2 className="text-[20px] font-bold text-[#006d2f] mb-6">Personal Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#3d4a3d] mb-1">Full Name</label>
              <input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className={inputClass(false)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#3d4a3d] mb-1">Business Name</label>
              <input type="text" value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} className={inputClass(false)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#3d4a3d] mb-1">Email</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass(false)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#3d4a3d] mb-1">Region</label>
              <div className="relative">
                <select value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} className={selectClass(false)}>
                  <option value="">Select region</option>
                  {GHANA_REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
                <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3d4a3d] pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#3d4a3d] mb-1">City / Town</label>
              <input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className={inputClass(false)} />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
          <button onClick={handleSave} disabled={isSaving} className="w-full h-12 bg-[#30CB65] text-white rounded-[12px] font-semibold text-sm flex items-center justify-center mt-8 hover:opacity-90 transition-opacity active:scale-[0.98]">
            {isSaving ? <Loader2 size={18} className="animate-spin mr-2" /> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function EditProfessionalInfo({ profile, token, onBack, onSuccess }: any) {
  const [formData, setFormData] = useState({
    category: profile?.category || "",
    services: Array.isArray(profile?.services) ? profile.services : (typeof profile?.services === 'string' ? profile.services.split(', ') : []),
    experience: profile?.experience || "",
    description: profile?.description || ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const availableServices = formData.category ? serviceMap[formData.category] || [] : [];

  const toggleService = (s: string) => {
    if (formData.services.includes(s)) setFormData({ ...formData, services: formData.services.filter((x:string) => x !== s) });
    else setFormData({ ...formData, services: [...formData.services, s] });
  };

  const handleSave = async () => {
    setIsSaving(true); setError("");
    try {
      const res = await fetch(\\user\, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: \Bearer \\ },
        body: JSON.stringify({ ...formData, services: formData.services.join(', ') }),
      });
      if (res.ok) onSuccess();
      else setError("Failed to save changes.");
    } catch { setError("Network error."); }
    finally { setIsSaving(false); }
  };

  return (
    <div className="min-h-screen bg-[#EEF6F9]">
      <MobileRegHeader onBack={onBack} />
      <div className="px-6 pt-6 pb-24">
        <div className="bg-white rounded-[32px] p-6 shadow-[0_4px_24px_rgba(0,64,79,0.06)]">
          <h2 className="text-[20px] font-bold text-[#006d2f] mb-6">Professional Info</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#3d4a3d] mb-1">Service Category</label>
              <div className="relative">
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value, services: [] })} className={selectClass(false)}>
                  <option value="">Select a category...</option>
                  {Object.keys(serviceMap).map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3d4a3d] pointer-events-none" />
              </div>
            </div>
            {formData.category && (
              <div>
                <label className="block text-sm font-semibold text-[#3d4a3d] mb-1">Specific Services</label>
                <div className="grid grid-cols-1 gap-2">
                  {availableServices.map((s) => {
                    const sel = formData.services.includes(s);
                    return (
                      <div key={s} onClick={() => toggleService(s)}
                        className={\lex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors text-sm \\}>
                        <div className={\w-5 h-5 rounded border flex items-center justify-center shrink-0 \\}>
                          {sel && <Check size={12} className="text-white" />}
                        </div>
                        {s}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-[#3d4a3d] mb-1">Years of Experience</label>
              <input type="number" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className={inputClass(false)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#3d4a3d] mb-1">Description</label>
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className={\\ resize-y\} />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
          <button onClick={handleSave} disabled={isSaving} className="w-full h-12 bg-[#30CB65] text-white rounded-[12px] font-semibold text-sm flex items-center justify-center mt-8 hover:opacity-90 transition-opacity active:scale-[0.98]">
            {isSaving ? <Loader2 size={18} className="animate-spin mr-2" /> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function EditRates({ profile, token, onBack, onSuccess }: any) {
  const [formData, setFormData] = useState({
    availability: profile?.availability || "Available",
    diaspora: profile?.diaspora || false,
    minPrice: profile?.minPrice || "",
    maxPrice: profile?.maxPrice || ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setIsSaving(true); setError("");
    try {
      const res = await fetch(\\user\, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: \Bearer \\ },
        body: JSON.stringify(formData),
      });
      if (res.ok) onSuccess();
      else setError("Failed to save changes.");
    } catch { setError("Network error."); }
    finally { setIsSaving(false); }
  };

  return (
    <div className="min-h-screen bg-[#EEF6F9]">
      <MobileRegHeader onBack={onBack} />
      <div className="px-6 pt-6 pb-24">
        <div className="bg-white rounded-[32px] p-6 shadow-[0_4px_24px_rgba(0,64,79,0.06)]">
          <h2 className="text-[20px] font-bold text-[#006d2f] mb-6">Rates & Availability</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#161d16] mb-2">Current Availability</label>
              <div className="grid grid-cols-3 gap-2">
                {["Available", "Busy", "Inactive"].map((s) => (
                  <button key={s} onClick={() => setFormData({ ...formData, availability: s })}
                    className={\py-3 px-2 border text-center rounded-lg transition-colors text-sm font-medium \\}>
                    <div className="text-lg mb-0.5">{s === "Available" ? "?" : s === "Busy" ? "?" : "??"}</div>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div
              onClick={() => setFormData({ ...formData, diaspora: !formData.diaspora })}
              className={\lex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors \\}>
              <div className={\elative w-10 h-6 shrink-0 rounded-full mt-0.5 transition-colors \\}>
                <div className={\bsolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow \\} />
              </div>
              <div>
                <span className="block font-semibold text-sm text-[#161d16] mb-0.5">Serves Diaspora Clients</span>
                <span className="text-xs text-[#3d4a3d]">I accept jobs arranged and paid for by Ghanaians living abroad.</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#161d16] mb-1.5">Estimated Price Range (GHS)</label>
              <div className="flex gap-2">
                <input type="number" value={formData.minPrice} onChange={(e) => setFormData({ ...formData, minPrice: e.target.value })} placeholder="Min" className={inputClass(false)} />
                <input type="number" value={formData.maxPrice} onChange={(e) => setFormData({ ...formData, maxPrice: e.target.value })} placeholder="Max" className={inputClass(false)} />
              </div>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
          <button onClick={handleSave} disabled={isSaving} className="w-full h-12 bg-[#30CB65] text-white rounded-[12px] font-semibold text-sm flex items-center justify-center mt-8 hover:opacity-90 transition-opacity active:scale-[0.98]">
            {isSaving ? <Loader2 size={18} className="animate-spin mr-2" /> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function AvatarSelectionModal({ token, currentAvatar, onClose, onSuccess }: any) {
  const [selected, setSelected] = useState(currentAvatar || "");
  const [isSaving, setIsSaving] = useState(false);

  const avatars = [
    "/avatars/avatar-1.png",
    "/avatars/avatar-2.png",
    "/avatars/avatar-3.png"
  ];

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(\\user\, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: \Bearer \\ },
        body: JSON.stringify({ avatarUrl: selected }),
      });
      if (res.ok) onSuccess();
    } catch { }
    finally { setIsSaving(false); }
  };

  return (
    <div className="fixed inset-0 bg-[#00404F]/50 backdrop-blur-sm z-50 flex flex-col justify-end">
      <div className="bg-white rounded-t-[32px] w-full p-6 pb-12 animate-in slide-in-from-bottom duration-300">
        <div className="w-12 h-1.5 bg-[#dce5d9] rounded-full mx-auto mb-6" />
        <h2 className="text-[20px] font-bold text-[#006d2f] mb-6 text-center">Choose an Avatar</h2>
        
        <div className="flex justify-center gap-4 mb-8">
          {avatars.map((url, idx) => (
            <button key={idx} onClick={() => setSelected(url)}
              className={\w-24 h-24 rounded-full overflow-hidden border-4 transition-all \\}>
              <img src={url} alt={\Avatar \\} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 h-12 rounded-[12px] bg-[#eef6ea] text-[#006d2f] font-semibold text-sm">Cancel</button>
          <button onClick={handleSave} disabled={isSaving} className="flex-1 h-12 rounded-[12px] bg-[#30CB65] text-white font-semibold text-sm flex items-center justify-center">
            {isSaving ? <Loader2 size={18} className="animate-spin mr-2" /> : "Save Avatar"}
          </button>
        </div>
      </div>
    </div>
  );
}
\

code += appendedComponents;
fs.writeFileSync(file, code, 'utf8');
