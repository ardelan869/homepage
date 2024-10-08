'use client';

import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import createOrEditPost, {
  deletePost,
  getPostBySlug
} from '@/server/actions/posts';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

export default function Editor(previous: {
  slug?: string;
  title?: string;
  description?: string;
  content?: string;
}) {
  const [slug, setSlug] = useState(previous?.slug ?? '');
  const [debouncedSlug] = useDebounce(slug, 500);
  const [title, setTitle] = useState(previous?.title ?? '');
  const [description, setDescription] = useState(previous?.description ?? '');
  const [content, setContent] = useState(previous?.content ?? '');
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const createOrEdit = useCallback(async () => {
    if (
      slug.length < 3 ||
      title.length < 3 ||
      description.length < 3 ||
      content.length < 3
    ) {
      toast.error('Please fill out all fields');

      return;
    }

    setLoading(true);

    const err = await createOrEditPost(
      {
        slug,
        title,
        description,
        content
      },
      secret
    );

    if (typeof err === 'object' && 'message' in err) {
      toast.error(err.message);
    } else {
      toast.success('Post created');
    }

    setLoading(false);
  }, [slug, title, description, content, secret]);

  const handleDelete = useCallback(async () => {
    if (slug.length < 3) {
      toast.error('Please fill out all fields');

      return;
    }

    setDeleting(true);

    const success = await deletePost(slug, secret);

    if (!success) {
      toast.error('Failed to delete post');
      return;
    }

    toast.success('Post deleted');

    setDeleting(false);
  }, [slug, secret]);

  useEffect(() => {
    getPostBySlug(debouncedSlug).then((post) => {
      if (!post) return;

      setTitle(post.title);
      setDescription(post.description);
      setContent(post.content);
    });
  }, [debouncedSlug]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 overflow-y-scroll pt-2">
      <div className="flex w-full items-center gap-4">
        <div className="flex-grow">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            placeholder="Slug"
            minLength={3}
            maxLength={32}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>
        <div className="flex-grow">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Title"
            minLength={3}
            maxLength={32}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSlug(e.target.value.toLowerCase().replaceAll(' ', '-'));
            }}
          />
        </div>
      </div>

      <div className="w-full">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          placeholder="Description"
          minLength={3}
          maxLength={128}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="w-full">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Content"
          className="resize-y"
          minLength={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="mt-12 flex w-80 flex-col items-center justify-center gap-2">
        <div className="w-full">
          <Label htmlFor="secret">Secret</Label>
          <Input
            className="w-full"
            type="password"
            id="secret"
            placeholder="Secret"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
        </div>
        <div className="flex w-full items-center gap-2">
          <Button
            variant="outline"
            className="w-full rounded-none"
            disabled={loading}
            onClick={createOrEdit}
          >
            Create
          </Button>
          <Button
            className="h-10 w-10 rounded-none p-3"
            variant="destructive"
            disabled={deleting}
            onClick={handleDelete}
          >
            <Trash className="h-full w-full" />
          </Button>
        </div>
      </div>
    </main>
  );
}
