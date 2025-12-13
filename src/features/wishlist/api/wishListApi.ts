import api from '@/config/axios-config';
import type { Wishlist, WishlistItem } from '../types/wishlistTypes';

export const wishlistApi = {
  async fetchWatchlists():Promise<Wishlist[]> {
    const res = await api.get('/api/watchlist');
    return res.data;
  },

  async fetchWatchlistItems(watchlistId: number): Promise<WishlistItem[]> {
    const res = await api.get(`/api/watchlist/${watchlistId}/items`);
    return res.data;
  },

  async createWatchlist(name: string) {
    const res = await api.post('/api/watchlist', { name }, {
      headers: { "x-requires-auth": true }
    });
    return res.data;
  },

  async addToWatchlist(watchlistId: number, productId: number) {
    const res = await api.post(`/api/watchlist/${watchlistId}/items`, { productId }, {
      headers: { "x-requires-auth": true }
    });
    return res.data;
  },

  async removeFromWatchlist(watchlistId: number, productId: number): Promise<void> {
    await api.delete(`/api/watchlist/${watchlistId}/items/${productId}`);
  },

  async deleteWatchlist(watchlistId: number): Promise<void> {
    await api.delete(`/api/watchlist/${watchlistId}`);
  }
};