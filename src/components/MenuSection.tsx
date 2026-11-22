import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, Eye, Sparkles, Filter, ChefHat, X } from 'lucide-react';
import { MENU_ITEMS, CHEF_INFO } from '@/config';
import { MenuItem, MenuCategory, DietaryTag } from '../types/restaurant.types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ResponsiveImage } from '@/components/ui/responsive-image';

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
        const matchesDetails = item.longDescription.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesDetails) return false;
      }
      return true;
    });
  }, [activeCategory, selectedTag, searchQuery]);

  const tagColors: Record<string, string> = {
    'Vegetarian': 'bg-emerald-100 text-emerald-800 border-emerald-300',
    'Chef Special': 'bg-gold-400/25 text-gold-700 border-gold-400/40',
    'Gluten Free': 'bg-blue-100 text-blue-800 border-blue-300',
    'Signature': 'bg-forest-800 text-gold-400 border-gold-400/50',
    'Seafood': 'bg-sky-100 text-sky-800 border-sky-300',
  };

  const handleClearFilters = () => {
    setActiveCategory('All');
    setSelectedTag('All');
    setSearchQuery('');
  };

  return (
    <section id="menu" className="py-16 sm:py-20 lg:py-28 bg-cream-100 text-charcoal-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading matching reference mockup */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="tot-font-display italic text-gold-700 text-xl sm:text-2xl font-normal block mb-1">
            Taste Our Delights
          </span>
          <h2 className="tot-font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900 tracking-tight mb-3">
            Our Signature Menu
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mb-3" />
          <p className="text-xs sm:text-sm text-charcoal-500 font-light leading-relaxed">
            Curated by Executive {CHEF_INFO.name}. Explore cold-pressed estate olive oils, fresh extruded pastas, and wood-fired delicacies.
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
                    ? 'bg-forest-800 text-gold-400 font-semibold border-gold-400/60 shadow-md transform -translate-y-0.5'
                    : 'bg-white text-charcoal-500 hover:text-forest-900 hover:bg-cream-200 border-gold-400/25'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Filters & Search Bar Row – Fixed to never overlap on any viewport */}
        <div className="mb-8 p-3.5 sm:p-4 rounded-2xl bg-white/80 border border-gold-400/25 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5">
          {/* Dietary Filters */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0 tot-custom-scroll">
            <span className="text-charcoal-500 text-xs font-semibold flex items-center gap-1 flex-shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5 text-gold-700" /> Filter:
            </span>
            {dietaryFilters.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap border ${
                  selectedTag === tag
                    ? 'bg-gold-500 text-forest-900 font-semibold border-gold-500 shadow-sm'
                    : 'bg-cream-50 text-charcoal-500 hover:bg-sand-300 border-gold-400/30'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-500" />
            <input
              type="text"
              aria-label="Search dishes"
              placeholder="Search dishes, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2 rounded-full bg-cream-50 border border-gold-400/35 text-xs sm:text-sm text-forest-900 placeholder-charcoal-500/60 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-500 hover:text-forest-900"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Results Counter / Filter status */}
        <div className="flex items-center justify-between mb-6 text-xs text-charcoal-500 px-1">
          <span>
            Showing <strong className="text-forest-900">{filteredItems.length}</strong> {filteredItems.length === 1 ? 'dish' : 'dishes'}
            {activeCategory !== 'All' && <span> in <span className="font-semibold text-forest-900">{activeCategory}</span></span>}
            {selectedTag !== 'All' && <span> • Filtered by <span className="font-semibold text-gold-700">{selectedTag}</span></span>}
          </span>
          {(activeCategory !== 'All' || selectedTag !== 'All' || searchQuery) && (
            <button
              onClick={handleClearFilters}
              className="text-xs text-gold-700 hover:text-forest-900 font-semibold underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Dishes Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-gold-400/40 max-w-lg mx-auto">
            <ChefHat className="w-12 h-12 text-gold-400/60 mx-auto mb-3" />
            <h3 className="tot-font-serif text-xl font-bold text-forest-900 mb-2">No dishes match your selection</h3>
            <p className="text-xs text-charcoal-500 mb-5">Try relaxing your dietary filter or search for a different ingredient.</p>
            <Button
              onClick={handleClearFilters}
              className="px-5 py-2.5 text-xs shadow-md"
            >
              Show All Dishes
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredItems.map((dish) => {
              const isSelected = selectedDishIds.has(dish.id);
              return (
                <div
                  key={dish.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gold-400/25 hover:border-gold-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Food Image Container */}
                  <div
                    role="presentation"
                    className="relative h-52 sm:h-56 overflow-hidden cursor-pointer flex-shrink-0"
                    onClick={() => onSelectDish(dish)}
                  >
                    <ResponsiveImage
 sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 via-transparent to-transparent opacity-85 group-hover:opacity-65 transition-opacity" />

                    {/* Price Tag Badge */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-forest-800/90 backdrop-blur-sm text-gold-400 tot-font-serif font-bold text-sm border border-gold-400/40 shadow-md">
                      ₹{dish.price.toLocaleString('en-IN')}
                    </div>

                    {/* Dietary Tags */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1 max-w-[70%]">
                      {dish.tags.slice(0, 2).map((tag, i) => (
                        <Badge
                          key={i}
                          className={cn(
                            'px-2 normal-case tracking-normal backdrop-blur-sm shadow-sm',
                            tagColors[tag] || 'bg-white/95 text-forest-900 border-gray-200'
                          )}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Quick View Hover Pill */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-forest-900/90 text-gold-400 text-[11px] font-medium border border-gold-400/35 shadow-md">
                        <Eye className="w-3 h-3" /> View Notes
                      </span>
                    </div>
                  </div>

                  {/* Dish Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="tot-font-serif text-base sm:text-lg font-bold leading-snug mb-2 line-clamp-1">
                        <button
                          type="button"
                          onClick={() => onSelectDish(dish)}
                          className="text-left text-forest-900 hover:text-gold-700 transition-colors cursor-pointer"
                        >
                          {dish.name}
                        </button>
                      </h3>
                      <p className="text-xs text-charcoal-500 line-clamp-2 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>

                    {/* Bottom Actions Bar */}
                    <div className="pt-3 mt-4 border-t border-gold-400/15 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onSelectDish(dish)}
                        className="text-[11px] text-gold-700 hover:text-forest-900 font-semibold inline-flex items-center gap-1 py-1 cursor-pointer transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Tasting Notes</span>
                      </button>

                      <button
                        onClick={() => onAddToTasting(dish)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-forest-800 text-gold-400 border border-gold-400 shadow-sm'
                            : 'bg-cream-150 hover:bg-gold-500 text-forest-900 border border-gold-400/30 hover:border-gold-500'
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
          <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-forest-800 border border-gold-400/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-cream-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-400 text-forest-900 flex items-center justify-center font-bold flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-sm sm:text-base text-cream-100">
                  {selectedDishIds.size} {selectedDishIds.size === 1 ? 'dish' : 'dishes'} in your Tasting Flight
                </div>
                <div className="text-xs text-mist-400">
                  Attach this custom flight directly to your table reservation for seamless service.
                </div>
              </div>
            </div>
            <Button
              onClick={onOpenTastingDrawer}
              className="px-5 py-2.5 text-xs sm:text-sm whitespace-nowrap shadow-md"
            >
              Review Tasting List
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
