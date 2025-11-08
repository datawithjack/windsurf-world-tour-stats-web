import axios from 'axios';
import type { Rider, Event, Heat, QuickStats, HeadToHead, EventsResponse } from '../types';

// Production API URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://windsurf-world-tour-stats-api.duckdns.org/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
  },
});

// API Service
export const apiService = {
  // Riders
  async getRiders(): Promise<Rider[]> {
    const response = await api.get('/riders');
    return response.data;
  },

  async getRider(id: number): Promise<Rider> {
    const response = await api.get(`/riders/${id}`);
    return response.data;
  },

  async getFeaturedRider(): Promise<Rider> {
    const response = await api.get('/riders/featured');
    return response.data;
  },

  // Events
  async getEvents(page = 1, pageSize = 50, waveOnly = true): Promise<EventsResponse> {
    const response = await api.get('/events', {
      params: {
        page,
        page_size: pageSize,
        wave_only: waveOnly,
      },
    });
    return response.data;
  },

  async getEvent(id: number): Promise<Event> {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  async getRecentEvents(limit = 3): Promise<Event[]> {
    const response = await this.getEvents(1, limit, true);
    return response.events;
  },

  // Heats
  async getHeats(eventId: number): Promise<Heat[]> {
    const response = await api.get(`/events/${eventId}/heats`);
    return response.data;
  },

  // Stats
  async getQuickStats(): Promise<QuickStats> {
    const response = await api.get('/stats/quick');
    return response.data;
  },

  // Head to Head
  async getHeadToHead(rider1Id: number, rider2Id: number): Promise<HeadToHead> {
    const response = await api.get(`/head-to-head/${rider1Id}/${rider2Id}`);
    return response.data;
  },
};

export default api;
