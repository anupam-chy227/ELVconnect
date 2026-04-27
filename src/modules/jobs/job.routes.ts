import { Router } from 'express';
import * as jobController from './job.controller';
import { requireAuth } from '../../middleware/requireAuth';
import { roleGuard } from '../../middleware/roleGuard';
import { validate } from '../../middleware/validate';
import {
  createJobSchema,
  applyToJobSchema,
  updateApplicationStatusSchema,
  jobQuerySchema,
} from './job.schema';

const router = Router();

// Public: browse jobs with optional geo filter
// GET /api/v1/jobs
router.get('/', validate(jobQuerySchema), jobController.listJobs);

// GET /api/v1/jobs/:id
router.get('/:id', jobController.getJob);

// Authenticated routes below
router.use(requireAuth);

// GET /api/v1/jobs/my — customer's posted jobs
router.get('/my', roleGuard('customer', 'admin'), jobController.myJobs);

// GET /api/v1/jobs/nearby — service provider's nearby jobs (uses their saved location)
router.get('/nearby', roleGuard('service_provider'), jobController.nearbyJobs);

// POST /api/v1/jobs — customer posts a new job
router.post('/', roleGuard('customer', 'admin'), validate(createJobSchema), jobController.createJob);

// POST /api/v1/jobs/:id/apply — service provider applies
router.post('/:id/apply', roleGuard('service_provider'), validate(applyToJobSchema), jobController.applyToJob);

// PATCH /api/v1/jobs/:id/application — customer shortlists/accepts/rejects
router.patch('/:id/application', roleGuard('customer', 'admin'), validate(updateApplicationStatusSchema), jobController.updateApplicationStatus);

// DELETE /api/v1/jobs/:id — customer deletes their job
router.delete('/:id', roleGuard('customer', 'admin'), jobController.deleteJob);

export default router;
