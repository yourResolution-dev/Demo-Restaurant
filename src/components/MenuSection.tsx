import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, Eye, Sparkles, Filter, ChefHat, X } from 'lucide-react';
import { MENU_ITEMS, FALLBACK_FOOD_IMAGE } from '../data/restaurantData';
import { MenuItem, MenuCategory, DietaryTag } from '../types/restaurant.types';

interface MenuSectionProps {
  onSelectDish: (item: MenuItem) => void;
  onAddToTasting: (item: MenuItem) => void;
  selectedDishIds: Set<string>;
  onOpenTastingDrawer: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectDish,
  onAddToTasting,
  selectedDishIds,
  onOpenTastingDrawer,
}) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: MenuCategory[] = [
    'All',
    'Best Appetizers',
    'Mains & Specialties',
    'Woodfire & Pasta',
    'Decadent Desserts',
    'Artisanal Cocktails & Wines',
  ];

  const dietaryFilters: ('All' | DietaryTag)[] = [
    'All', 'Vegetarian', 'Chef Special', 'Gluten Free', 'Seafood',
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      if (activeCategory !== 'All' && item.category !== activeCategory) return false;
      if (selectedTag !== 'All' && !item.tags.includes(selectedTag as DietaryTag)) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) return false;
      }
      return true;
    });
  }, [activeCategory, selectedTag, searchQuery]);

  const tagColors: Record<string, string> = {
    'Vegetarian': 'bg-emerald-100 text-emerald-800 border-emerald-300',
    'Chef Special': 'bg-[#dfb85c]/25 text-[#88621a] border-[#dfb85c]/40',
    'Gluten Free': 'bg-blue-100 text-blue-800 border-blue-300',
    'Signature': 'bg-[#10261d] text-[#dfb85c] border-[#dfb85c]/50',
    'Seafood': 'bg-sky-100 text-sky-800 border-sky-300',
  };

  const handleClearFilters = () => {
    setActiveCategory('All');
    setSelectedTag('All');
    setSearchQuery('');
  };

  return (
    <section id="menu" className="py-16 sm:py-20 lg:py-28 bg-[#f7f3ea] text-[#141c18] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading matching reference mockup */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="tot-font-display italic text-[#cfa138] text-xl sm:text-2xl font-normal block mb-1">
            Taste Our Delights
          </span>
          <h2 className="tot-font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#081510] tracking-tight mb-3">
            Our Signature Menu
          </h2>
          <div className="w-16 h-0.5 bg-[#cfa138] mx-auto mb-3" />
          <p className="text-xs sm:text-sm text-[#58685e] font-light leading-relaxed">
            Curated by Executive Chef Marco Valenti. Explore cold-pressed estate olive oils, fresh extruded pastas, and wood-fired delicacies.
          </p>
        </div>

        {/* Primary Category Tabs */}
        <div className="mb-6 overflow-x-auto pb-2 tot-custom-scroll">
          <div className="flex items-center gap-2 min-w-max mx-auto justify-start md:justify-center px-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer border ${
                  activeCategory === cat
                    ? 'bg-[#10261d] text-[#dfb85c] font-semibold border-[#dfb85c]/60 shadow-md transform -translate-y-0.5'
                    : 'bg-white text-[#58685e] hover:text-[#081510] hover:bg-[#efe7d7] border-[#dfb85c]/25'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Filters & Search Bar Row – Fixed to never overlap on any viewport */}
        <div className="mb-8 p-3.5 sm:p-4 rounded-2xl bg-white/80 border border-[#dfb85c]/25 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5">
          {/* Dietary Filters */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0 tot-custom-scroll">
            <span className="text-[#58685e] text-xs font-semibold flex items-center gap-1 flex-shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5 text-[#cfa138]" /> Filter:
            </span>
            {dietaryFilters.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap border ${
                  selectedTag === tag
                    ? 'bg-[#cfa138] text-[#081510] font-semibold border-[#cfa138] shadow-sm'
                    : 'bg-[#fbf9f5] text-[#58685e] hover:bg-[#ede3d1] border-[#dfb85c]/30'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#58685e]" />
            <input
              type="text"
              placeholder="Search dishes, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2 rounded-full bg-[#fbf9f5] border border-[#dfb85c]/35 text-xs sm:text-sm text-[#081510] placeholder-[#58685e]/60 focus:outline-none focus:border-[#cfa138] focus:ring-1 focus:ring-[#cfa138] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#58685e] hover:text-[#081510]"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Results Counter / Filter status */}
        <div className="flex items-center justify-between mb-6 text-xs text-[#58685e] px-1">
          <span>
            Showing <strong className="text-[#081510]">{filteredItems.length}</strong> {filteredItems.length === 1 ? 'dish' : 'dishes'}
            {activeCategory !== 'All' && <span> in <span className="font-semibold text-[#081510]">{activeCategory}</span></span>}
            {selectedTag !== 'All' && <span> • Filtered by <span className="font-semibold text-[#cfa138]">{selectedTag}</span></span>}
          </span>
          {(activeCategory !== 'All' || selectedTag !== 'All' || searchQuery) && (
            <button
              onClick={handleClearFilters}
              className="text-xs text-[#cfa138] hover:text-[#88621a] font-semibold underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Dishes Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-[#dfb85c]/40 max-w-lg mx-auto">
            <ChefHat className="w-12 h-12 text-[#dfb85c]/60 mx-auto mb-3" />
            <h3 className="tot-font-serif text-xl font-bold text-[#081510] mb-2">No dishes match your selection</h3>
            <p className="text-xs text-[#58685e] mb-5">Try relaxing your dietary filter or search for a different ingredient.</p>
            <button
              onClick={handleClearFilters}
              className="px-5 py-2.5 rounded-full tot-btn-gold text-xs font-semibold cursor-pointer shadow-md"
            >
              Show All Dishes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredItems.map((dish) => {
              const isSelected = selectedDishIds.has(dish.id);
              return (
                <div
                  key={dish.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#dfb85c]/25 hover:border-[#dfb85c] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Food Image Container */}
                  <div
                    className="relative h-52 sm:h-56 overflow-hidden cursor-pointer flex-shrink-0"
                    onClick={() => onSelectDish(dish)}
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_FOOD_IMAGE;
                      }}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081510]/70 via-transparent to-transparent opacity-85 group-hover:opacity-65 transition-opacity" />

                    {/* Price Tag Badge */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#10261d]/90 backdrop-blur-sm text-[#dfb85c] tot-font-serif font-bold text-sm border border-[#dfb85c]/40 shadow-md">
                      ₹{dish.price.toLocaleString('en-IN')}
                    </div>

                    {/* Dietary Tags */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1 max-w-[70%]">
                      {dish.tags.slice(0, 2).map((tag, i) => (
                        <span
                          key={i}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-sm border shadow-sm ${
                            tagColors[tag] || 'bg-white/95 text-[#081510] border-gray-200'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Quick View Hover Pill */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#081510]/90 text-[#dfb85c] text-[11px] font-medium border border-[#dfb85c]/35 shadow-md">
                        <Eye className="w-3 h-3" /> View Notes
                      </span>
                    </div>
                  </div>

                  {/* Dish Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        onClick={() => onSelectDish(dish)}
                        className="tot-font-serif text-base sm:text-lg font-bold text-[#081510] hover:text-[#cfa138] transition-colors cursor-pointer leading-snug mb-2 line-clamp-1"
                      >
                        {dish.name}
                      </h3>
                      <p className="text-xs text-[#58685e] line-clamp-2 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>

                    {/* Bottom Actions Bar */}
                    <div className="pt-3 mt-4 border-t border-[#dfb85c]/15 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onSelectDish(dish)}
                        className="text-[11px] text-[#cfa138] hover:text-[#88621a] font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Tasting Notes</span>
                      </button>

                      <button
                        onClick={() => onAddToTasting(dish)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#10261d] text-[#dfb85c] border border-[#dfb85c] shadow-sm'
                            : 'bg-[#f4ede4] hover:bg-[#cfa138] text-[#081510] border border-[#dfb85c]/30 hover:border-[#cfa138]'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Selected</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Tasting</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tasting Selection Callout Banner */}
        {selectedDishIds.size > 0 && (
          <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-[#10261d] border border-[#dfb85c]/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-[#f7f3ea]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#dfb85c] text-[#081510] flex items-center justify-center font-bold flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-sm sm:text-base text-[#f7f3ea]">
                  {selectedDishIds.size} {selectedDishIds.size === 1 ? 'dish' : 'dishes'} in your Tasting Flight
                </div>
                <div className="text-xs text-[#a0b0a6]">
                  Attach this custom flight directly to your table reservation for seamless service.
                </div>
              </div>
            </div>
            <button
              onClick={onOpenTastingDrawer}
              className="px-5 py-2.5 rounded-full tot-btn-gold text-xs sm:text-sm font-semibold whitespace-nowrap cursor-pointer shadow-md"
            >
              Review Tasting List
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
